import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/database/db";
import Testimonial from "@/lib/models/Testimonials";

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const body = await req.json();
    const newTestimonial = await Testimonial.create(body);
    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to add testimonial" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const testimonials = await Testimonial.find();
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
};

