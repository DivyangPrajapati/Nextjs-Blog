import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/user';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const user = await User.findOne({slug: params.userSlug}, { password:0 });

    if( !user ) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}