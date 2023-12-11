import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Tag from '@/models/tag';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const tag = await Tag.findOne({slug: params.tagSlug});

    if( !tag ) {
      return NextResponse.json({ success: false, message: 'Tag not found' }, { status: 404 });
    }
    return NextResponse.json(tag);
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}