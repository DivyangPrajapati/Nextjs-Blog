import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Post from '@/models/post';

export async function GET(request) {
  try {
    await dbConnect();

    const {searchParams} = new URL(request.url);
    const reqStatus = searchParams.get('status');
    let statusArr = ['published', 'draft'];
    let query = {}; 

    if( reqStatus === 'all' ) {
      // Do nothing
    } else if( statusArr.includes(reqStatus) ) {
      query.status = reqStatus;
    } else {
      query.status = 'published';
    }

    const posts = await Post.find(query).populate('author', '-password').sort({'createdAt': -1});console.log("------------test--------");console.log(posts);
    return NextResponse.json({ posts });
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message },
      { status: 500 });
  }
}