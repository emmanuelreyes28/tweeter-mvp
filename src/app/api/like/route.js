import dbConnect from "@/lib/dbConnect";
import Like from "@/models/Like";
import User from "@/models/User";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// POST: create a like
export async function POST(request) {
  await dbConnect();
  const data = await request.json();

  const { user, content } = data;

  try {
    const username = await User.findOne({ user });
    const postLiked = await Post.findOne({ content });

    const like = new Like({
      user: username._id,
      post: postLiked._id,
    });

    await like.save();

    return NextResponse.json(
      { message: "Like created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}

// DELETE: delete a like

// GET: get likes for a given post

// GET: get likes by a user
