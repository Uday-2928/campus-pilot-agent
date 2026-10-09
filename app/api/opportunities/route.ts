import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fallbackData from '@/lib/opportunities.json';

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

    if (error) {
      console.warn('Error fetching opportunities from Supabase, falling back to local JSON:', error);
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
