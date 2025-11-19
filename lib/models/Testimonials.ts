import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String }, 
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
