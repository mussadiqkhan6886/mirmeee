import Link from "next/link";
import Image from "next/image";
import order from "@/lib/models/OrderSchema";
import { connectDB } from "@/lib/config/database/db";

interface ItemType {
  _id: number
  images: string
  name: string
  quantity: number
  price: number
  discountPrice: number
  selectedColor: string
  selectedSize: string
  onSale: boolean
}

import type { Metadata } from 'next';
import { CheckCircle } from "lucide-react";

export const generateMetadata = (): Metadata => {
  return {
    title: 'Thankyou',
  };
};



const ThankYouPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  await connectDB()
    const res = await order.findOne({ _id: id });
    const data = JSON.parse(JSON.stringify(res))
  return (
    <main className="flex flex-col pt-24 justify-center items-center min-h-screen bg-gray-50 px-5">
      <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-2xl w-full">
        <CheckCircle size={36} color="green" className="text-center mx-auto my-4" />
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Your order has been placed successfully. We’ll contact you shortly to
          confirm your details.
        </p>

        {/* ✅ Order Summary */}
        <div className="text-left text-sm border-t border-gray-200 pt-4">
          <h2 className="text-base md:text-xl font-semibold text-gray-800 mb-3">
            Order Summary
          </h2>

          <p className="text-gray-700 mb-1">
            <strong>Order ID:</strong> {data.orderId}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Name:</strong> {data.userDetails.fullName}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Email:</strong> {data.userDetails.email}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Phone:</strong> {data.userDetails.phone}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Address:</strong> {data.shippingAddress.address}
          </p>

          {/* ✅ Items List */}
          <div className="space-y-3">
            {data.items?.map((item: ItemType) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    width={120}
                    height={120}
                    src={item.images}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name} - {item.selectedColor || item.selectedSize}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × Rs.{item.onSale ? item.discountPrice : item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  Rs.{item.onSale ? item.quantity * item.discountPrice : item.quantity * item.price} 
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-3 items-center">
            <p className="font-semibold">Shipping Cost</p>
            <p className="font-semibold">{(data.totalPrice) >= 2000 ? "Free Shipping" : "250 PKR"}</p>
          </div>
          <div className="mt-4 border-t pt-3 text-right">
            <p className="text-lg font-bold text-gray-800">
              Total: Rs.{data.totalPrice}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/"
            className="block w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
