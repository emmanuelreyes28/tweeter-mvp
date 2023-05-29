import dbConnect from "@/lib/dbConnect";
import Like from "@/models/Like";
import { NextResponse } from "next/server";

// GET: find all liked posts for a given userId
export async function GET(request, { params }) {
  await dbConnect();

  try {
    const likedPosts = await Like.find({ user: params.userId });
    return NextResponse.json(
      {
        message: "Successfully retrieved all liked posts for given userId",
        likedPosts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error finding all likes for given userId" },
      { status: 500 }
    );
  }
}
