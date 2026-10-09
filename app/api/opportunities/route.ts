import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fallbackData from '@/lib/opportunities.json';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const query = searchParams.get('query');

  try {
    let dbQuery = supabase
      .from('opportunities')
      .select('*, opportunity_skills(skill)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (type) {
      dbQuery = dbQuery.eq('event_type', type);
    }
    
    if (query) {
      dbQuery = dbQuery.ilike('title', `%${query}%`);
    }

    const { data, error } = await dbQuery;

    if (error || !data || data.length === 0) {
      console.warn('Error fetching or empty data from Supabase, falling back to local JSON');
      let localData = fallbackData;
      if (type) {
        localData = localData.filter(item => item.event_type === type);
      }
      if (query) {
        localData = localData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      }
      return NextResponse.json(localData);
    }

    // Format the skills array
    const formattedData = data.map(opp => ({
      ...opp,
      skills: opp.opportunity_skills?.map((s: any) => s.skill) || []
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error:', error);
    // Fallback one more time in case of severe fetch/network error
    let localData = fallbackData;
    if (type) {
      localData = localData.filter(item => item.event_type === type);
    }
    if (query) {
      localData = localData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    }
    return NextResponse.json(localData);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add an ID and date
    const newOpportunity = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      is_active: true,
      ...data
    };

    // For hackathon, we will just save to the local JSON fallback file 
    // to ensure it works even without a connected DB
    const filePath = path.join(process.cwd(), 'lib', 'opportunities.json');
    let currentData = [];
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      currentData = JSON.parse(fileContent);
    }
    
    currentData.unshift(newOpportunity);
    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));

    return NextResponse.json(newOpportunity, { status: 201 });
  } catch (error) {
    console.error('Failed to create opportunity:', error);
    return NextResponse.json({ error: 'Failed to create opportunity' }, { status: 500 });
  }
}
