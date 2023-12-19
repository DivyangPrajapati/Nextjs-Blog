import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Post from '@/models/post';
import User from '@/models/user';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    //const post = await Post.findOne({slug: params.postSlug}).populate('author', 'name');
    //const post = await Post.findOne({slug: params.postSlug}).populate('author', ['name', email]);
    const post = await Post.findOne({slug: params.postSlug}).populate('author', '-password').populate('categories');

    if( !post ) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}