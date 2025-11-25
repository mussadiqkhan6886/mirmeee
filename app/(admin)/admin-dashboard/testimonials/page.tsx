"use client";

import TestimonialsList from "@/components/adminComp/Testimonials";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials`
        );
        setTestimonials(res.data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-700 text-xl">
        Loading testimonials...
      </div>
    );

  return <TestimonialsList testimonials={testimonials} />;
}
