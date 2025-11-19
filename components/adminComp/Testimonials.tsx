import Link from "next/link";
import React from "react";
import DeleteReview from "./DeleteReview";


export default function TestimonialsList({
  testimonials,
}: {
  testimonials: reviewType[];
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center px-10 mb-4">
        <h1 className="text-2xl font-bold mb-6">Testimonials</h1>
      </div>
      {testimonials.length < 1 ? <div className="text-center text-3xl">No Reviews</div> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-3">
              
              <div>
                <h2 className="text-lg font-semibold capitalize">{t.name}</h2>
                <p className="text-gray-500 text-sm">{t.designation}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-3">
              “{t.message.length > 120
                ? t.message.slice(0, 120) + "..."
                : t.message}”
            </p>


            <div className="flex justify-between items-center text-sm text-gray-600">
            
              <div className="flex gap-3">
                <DeleteReview id={t._id} />
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}
