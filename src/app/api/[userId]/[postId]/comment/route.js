import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// POST: add a comment to a specified postId by a given userId
export async function POST(request, { params }) {
  await dbConnect();

  const existingUser = await User.findById(params.userId);
  const existingPost = await Post.findById(params.postId);
  const data = await request.json();

  const { content } = data;

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  if (!existingPost) {
    return NextResponse.json(
      { message: "Post no longer exists" },
      { status: 400 }
    );
  }

  try {
    // create comment
    const comment = new Comment({
      user: params.userId,
      post: params.postId,
      content,
    });

    await comment.save();

    return NextResponse.json(
      { message: "Comment created successfully " },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error posting comment" },
      { status: 500 }
    );
  }
}
