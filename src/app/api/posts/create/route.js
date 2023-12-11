import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { createSlug, createUniqueSlug } from "@/utils/slugUtil";
import Post from "@/models/post";
import { writeFile } from 'fs/promises';
import { createFileName } from "@/utils/fileUtil";
import { revalidatePath } from 'next/cache';
import { getDataFromToken } from "@/utils/tokenUtil";

export async function POST(request) {
  try {
    await dbConnect();
    // console.log(request);
    // const res = await request.json();
    // const { title, content, author, status = "published" } = res;

    const user = getDataFromToken(request);

    if( !user ) {
      return NextResponse.json(
        { success: false, message: "Please sign in." },
        { status: 400 }
      );
    }
    const author = user.id;

    const res = await request.formData();
    const title   = res.get('title');
    const content = res.get('content');
    const status  = res.get('status');
    // const author  = res.get('author');
    const file    = res.get('thumbnail');

    if (!title || !content || !author ) {
      return NextResponse.json(
        { success: false, message: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    let slug = await createUniqueSlug(title, Post);
    let thumbnail = '';

    if( file ) {
      const fileName = file.name;

      if (!fileName.match(/\.(jpg|jpeg|png)$/i)) {
        return NextResponse.json(
          { success: false, message: "Invalid file format. Please upload a JPG or PNG file." },
          { status: 400 }
        );
      }

      const bytes   = await file.arrayBuffer();
      const buffer  = Buffer.from(bytes);
      
      const fileNameWithoutExtension  = fileName.split('.').slice(0, -1).join('.');
      const fileNameExtension         = fileName.split('.').pop();
      let newFileName = createSlug(fileNameWithoutExtension);
      newFileName     = createFileName(newFileName);
      thumbnail       = `/articles/${newFileName}.${fileNameExtension}`;
      await writeFile(`public${thumbnail}`, buffer);
    }

    const newPost = new Post({
      title,
      content,
      slug,
      author,
      status,
      thumbnail
    });

    const post = await newPost.save();

    revalidatePath('/(admin)/admin/posts', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "Post created successfully!",
        success: true,
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
