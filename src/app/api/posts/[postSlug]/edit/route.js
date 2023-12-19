import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { createSlug, createUniqueSlug } from "@/utils/slugUtil";
import Post from "@/models/post";
import { writeFile } from 'fs/promises';
import { createFileName } from "@/utils/fileUtil";
import { revalidatePath } from 'next/cache';
import fs from 'fs';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    // console.log(request);
    // const res = await request.json();
    // const { title, content, author, status = "published" } = res;

    const res = await request.formData();
    const title   = res.get('title');
    const content = res.get('content');
    const status  = res.get('status');
    const file    = res.get('thumbnail');
    const categories  = JSON.parse(res.get('categories'));

    if (!title || !content ) {
      return NextResponse.json(
        { success: false, message: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    let updatedPost = {
        title,
        content,
        categories: categories ? categories : null
      };
    
    if( status ) {
        updatedPost = {...updatedPost, status};
    }
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
      let thumbnail   = `/articles/${newFileName}.${fileNameExtension}`;
      
      await writeFile(`public${thumbnail}`, buffer);

      updatedPost = {...updatedPost, thumbnail};

      const postThumb = await Post.findOne({slug: params.postSlug}, {thumbnail: 1} );
      if(  postThumb.thumbnail ) {
        fs.unlinkSync(`public${postThumb.thumbnail}`);
      }
    }

    const post = await Post.findOneAndUpdate({slug: params.postSlug}, {$set: updatedPost}, { new: true } );

    revalidatePath('/(admin)/admin/posts', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "Post updated successfully!",
        success: true,
        post,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
