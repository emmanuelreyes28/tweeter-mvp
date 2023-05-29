import dbConnect from "@/lib/dbConnect";
import Like from "@/models/Like";
import { NextResponse } from "next/server";

// POST: create a like
export async function POST(request) {
  await dbConnect();
  const { userId, postId } = await request.json();

  try {
    // check authorization and authentication

    // find existing like for user and post combination
    const existingLike = await Like.findOne({ user: userId, post: postId });

    // if the like already exists, remove it (dislike)
    if (existingLike) {
      // remove liked post from Like model
      await Like.findByIdAndRemove(existingLike._id);
      return NextResponse.json({ message: "Post disliked successfully" });
    }

    // create like
    const like = new Like({
      user: userId,
      post: postId,
    });

    await like.save();

    return NextResponse.json({ message: "Post liked successfully" }, like);
  } catch (error) {
    console.error("Error handling like: ", error);
    return NextResponse.json({ error: "Error handling like" }, { status: 500 });
  }
}

// GET: get likes for a given post

// GET: get likes by a user
