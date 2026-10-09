import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const topicId = searchParams.get('topicId');

    const dataPath = path.join(process.cwd(), 'lib', 'aptitude_data.json');
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ error: "Aptitude DB not found" }, { status: 404 });
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const db = JSON.parse(rawData);

    // Find Category Name and Topic Name
    let categoryName = "Category";
    let topicName = "Topic";
    
    const cat = db.categories.find((c: any) => c.id === categoryId);
    if (cat) {
      categoryName = cat.name;
      const top = cat.topics.find((t: any) => t.id === topicId);
      if (top) topicName = top.name;
    }

    // Filter questions
    let questions = db.questions;
    if (categoryId) {
      questions = questions.filter((q: any) => q.categoryId === categoryId);
    }
    if (topicId) {
      questions = questions.filter((q: any) => q.topicId === topicId);
    }

    if (!categoryId && !topicId) {
      return NextResponse.json({
        categories: db.categories,
      });
    }

    return NextResponse.json({ 
      categoryName,
      topicName,
      questions 
    });

  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch aptitude data' }, { status: 500 });
  }
}
