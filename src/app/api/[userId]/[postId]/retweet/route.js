import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Post from "@/models/Post";
import Retweet from "@/models/Retweet";
import { NextResponse } from "next/server";

// POST: add retweet postId made by given userId to retweet model
export async function POST(request, { params }) {
  await dbConnect();

  const existingUser = await User.findById(params.userId);
  const existingPost = await Post.findById(params.postId);
  const existingRetweet = await Retweet.findOne({
    user: params.userId,
    post: params.postId,
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  if (!existingPost) {
    return NextResponse.json(
      { message: "Post no longer exists" },
      { status: 400 }
    );
  }

  // if the tweet already exists, undo the retweet (remove)
  if (existingRetweet) {
    await Retweet.findByIdAndRemove(existingRetweet._id);
    return NextResponse.json(
      { message: "Undid retweet successfully" },
      { status: 200 }
    );
  }

  try {
    // create retweet
    const retweet = new Retweet({
      user: params.userId,
      post: params.postId,
    });

    await retweet.save();

    return NextResponse.json(
      { message: "Tweet was retweeted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error posting retweet" },
      { status: 500 }
    );
  }
}
