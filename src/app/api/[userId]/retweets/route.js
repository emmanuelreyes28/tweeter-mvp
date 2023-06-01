import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Retweet from "@/models/Retweet";
import { NextResponse } from "next/server";

// GET: retrieve all posts that were retweets by given userId
export async function GET(request, { params }) {
  await dbConnect();

  // check if user exists
  const existingUser = await User.findById(params.userId);

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  try {
    // retrieve all retweets made by userId
    const allRetweetsByUser = await Retweet.find({ user: params.userId });

    return NextResponse.json(
      {
        message: "Successfully retrieved all retweets by user",
        allRetweetsByUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting all retweets by user" },
      { status: 500 }
    );
  }
}
