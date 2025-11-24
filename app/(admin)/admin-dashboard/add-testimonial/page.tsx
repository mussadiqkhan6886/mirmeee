"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTestimonialPage = () => {
  const [form, setForm] = useState({
    name: "",
    rating: "",
    message: "",
  });
  const [result,setResult] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/testimonials", form);
      if (res.data.success) {
        setResult("Testimonial added successfully!")
        setForm({ name: "", rating: "", message: "" });
        setTimeout(() => {
          router.push("/admin-dashboard")
        }, 1500)
      } else {
        setResult("Failed to add testimonial.");
      }
    } catch (error) {
      setResult("Something went wrong!")
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold text-center text-main mb-10">
        Add Review
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-5"
      >
        <div>
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-main"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Stars</label>
          <input
            type="number"
            max={5}
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-main"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-main resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-main/90 transition"
        >
          Submit Testimonial
        </button>
        <p>{result}</p>
      </form>
    </div>
  );
};

export default AddTestimonialPage;
