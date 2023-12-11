import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/category';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const category = await Category.findOne({slug: params.catSlug});

    if( !category ) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}