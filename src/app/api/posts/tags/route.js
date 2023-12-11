import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Tag from '@/models/tag';

export async function GET(request) {
  try {
    await dbConnect();

    const tags = await Tag.find({});
    return NextResponse.json({ tags });
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message },
      { status: 500 });
  }
}