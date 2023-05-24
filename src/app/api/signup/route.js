import bcrypt from "bcrypt";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(request) {
  //await dbConnect();
  const json = await request.json();
  return NextResponse.json(res);
}
