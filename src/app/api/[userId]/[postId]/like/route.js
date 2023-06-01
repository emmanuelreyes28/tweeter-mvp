import dbConnect from "@/lib/dbConnect";
import Like from "@/models/Like";
import User from "@/models/User";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// POST: create a like
export async function POST(request, { params }) {
  await dbConnect();

  try {
    // check authorization and authentication
    const existingUser = await User.findById(params.userId);
    const existingPost = await Post.findById(params.postId);

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if (!existingPost) {
      return NextResponse.json(
        { message: "Post no longer exists" },
        { status: 400 }
      );
    }

    // find existing like for user and post combination
    const existingLike = await Like.findOne({
      user: params.userId,
      post: params.postId,
    });

    // if the like already exists, remove it (dislike)
    if (existingLike) {
      // remove liked post from Like model
      await Like.findByIdAndRemove(existingLike._id);
      return NextResponse.json({ message: "Post disliked successfully" });
    }

    // create like
    const like = new Like({
      user: params.userId,
      post: params.postId,
    });

    await like.save();

    return NextResponse.json({ message: "Post liked successfully" }, like);
  } catch (error) {
    console.error("Error handling like: ", error);
    return NextResponse.json({ error: "Error handling like" }, { status: 500 });
  }
}
