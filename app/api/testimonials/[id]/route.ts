import { connectDB } from "@/lib/config/database/db";
import Testimonial from "@/lib/models/Testimonials";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB(); 

    const { id } = await params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting testimonial", error: error.message },
      { status: 500 }
    );
  }
};
