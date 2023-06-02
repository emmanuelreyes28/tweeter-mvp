import dbConnect from "@/lib/dbConnect";
import Like from "@/models/Like";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// GET: retrieve all likes for given postId
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
    const allLikesForPost = await Like.find({ post: params.postId });

    return NextResponse.json(
      { message: "Successfully retrieved all likes for post", allLikesForPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving likes for given post" },
      { status: 500 }
    );
  }
}
