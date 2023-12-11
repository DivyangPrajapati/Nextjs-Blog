import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/category';

export async function GET(request) {
  try {
    await dbConnect();

    const categories = await Category.find({}).populate('parentCategory');
    return NextResponse.json({ categories });
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message },
      { status: 500 });
  }
}