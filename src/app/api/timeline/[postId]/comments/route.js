import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// GET: retrive all comments for given postId
export async function GET(request, { params }) {
  await dbConnect();

  const existingPost = await Post.findById(params.postId);

  if (!existingPost) {
    return NextResponse.json(
      { message: "Post no longer exists" },
      { status: 400 }
    );
  }

  try {
    const allCommentsForPost = await Comment.find({ post: params.postId });

    return NextResponse.json(
      {
        message: "Successfully retrieved all comments for post",
        allCommentsForPost,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving comments for given post" },
      { status: 500 }
    );
  }
}
