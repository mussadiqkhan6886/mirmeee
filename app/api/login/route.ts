import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/config/database/db";
import Admin from "@/lib/models/AdminSchema";

export const POST = async (req: NextRequest) => {
  await connectDB()
  try {
    const { email, password } = await req.json()


    const findUser = await Admin.findOne({ email })
    if (!findUser) {
      return NextResponse.json({ message: "User does not exist" }, { status: 400 })
    }



    const validPassword = await bcryptjs.compare(password, findUser.password)
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password" }, { status: 400 })
    }

    const tokenData = {
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
    const response = NextResponse.json({ message: "Login Successfully", success: true })
    
    response.cookies.set("adminToken", token, {
        httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // cookie available everywhere
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (err) {
    return NextResponse.json({ message: "Server error" + err }, { status: 500 })
  }
}
