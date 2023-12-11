import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/user';

export async function GET(request) {
  try {
    await dbConnect();

    const users = await User.find({}, { password:0 });
    return NextResponse.json({ users });
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message },
      { status: 500 });
  }
}