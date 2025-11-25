'use client';

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

const Checkout = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    // paymentMethod: "cod"
  });

  const { cart, totalAmount, clearCart } = useCart();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  // const [paymentProof, setPaymentProof] = useState<File | null>(null); 
  // const [preview, setPreview] = useState<string | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files[0]) { setPaymentProof(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); } };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      setStatus("Your cart is empty.");
      return;
    }

    setStatus("Sending...");
    setLoading(true);

    const data = {
      // include images for each item
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        onSale: item.onSale,
        discountPrice: item.discountPrice,
        quantity: item.quantity,
        images: item.images[0],
        selectedColor: item.selectedColor || "",
        selectedSize: item.selectedSize,
      })),
      totalPrice: totalAmount + 250,
      userDetails: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || "No email",
      },
      notes: formData.notes || "No Notes",
      shippingAddress: {
        city: formData.city,
        postalCode: formData.postalCode || "No Postal Code",
        address: formData.address,
      },
      // paymentMethod: formData.paymentMethod,
    };


    const formDataToSend = new FormData();
    // if(paymentProof){
    //   formDataToSend.append("paymentProof", paymentProof);
    // }
    formDataToSend.append("orderData", JSON.stringify(data));

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
        formDataToSend,{ headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus("Order placed successfully!");

      clearCart()

      // redirect to thank you page
      router.push(`/thank-you/${res.data.order._id}`);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex flex-col min-h-screen md:flex-row justify-between">
        {/* LEFT: FORM */}
        <div className="w-full pt-5 border-r lg:pl-20 pl-5 pr-5 border-gray-300 md:w-2/3">
          <h1 className="text-3xl text-center font-bold mb-6 border-b border-gray-300 pb-2">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
          >
            <div className="space-y-4">
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="city"
                type="text"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
            </div>

            <div className="space-y-4">
              <input
                name="address"
                placeholder="Full Address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full border-gray-300 outline-none p-3 border rounded-md"
              />
              <input
                name="postalCode"
                type="text"
                placeholder="Postal Code (optional)"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-3 border-gray-300 outline-none border rounded-md"
              />
              <textarea
                name="notes"
                placeholder="Order Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 border-gray-300 outline-none border rounded-md"
              />
            </div>
            <div className="text-black text-center border py-2 md:col-span-2">
              <p>Payment Method</p>
              <p>Cash on delivery </p>
              {/* <p>{formData.paymentMethod}</p>
              <select value={formData.paymentMethod} onChange={handleChange} name="paymentMethod">
                <option value="cod">Cash on Delivery</option>
                {/* <option value="easypaisa">Easypaisa</option> */}
                {/* <option value="card">Bank Payment</option> */}
              {/* </select> */}
            </div>

            {/* {formData.paymentMethod === "easypaisa" && ( <div className=" border border-green-400 bg-green-50 rounded-lg p-4 space-y-3"> <h3 className="font-semibold text-green-800 text-lg">Easypaisa Payment</h3> <p><strong>Number:</strong> 03154955421</p> <p><strong>Account Name:</strong> Muhammad Maaz</p> <label className="block text-sm font-medium text-gray-700 mt-2"> Upload Payment Screenshot </label> <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-200 hover:file:bg-gray-300" /> 
            {preview && ( <div className="mt-3"> <Image src={preview} alt="Payment proof" width={200} height={200} className="rounded-md border" /> </div> )} </div> )}  */}

            {/* {formData.paymentMethod === "card" && ( <div className=" border border-blue-400 bg-blue-50 rounded-lg p-4 space-y-3"> <h3 className="font-semibold text-blue-800 text-lg">Bank Transfer</h3> <p><strong>Bank:</strong> HBL</p> <p><strong>Account Title:</strong> IQRA NAA</p> <p><strong>Account No:</strong> 12877902882799</p>
            <p><strong>IBAN:</strong> PK84HABB0012877902882799</p><p><strong>BRANCH:</strong> DHUDHIAL</p> <label className="block text-sm font-medium text-gray-700 mt-2"> Upload Payment Proof </label> <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-200 hover:file:bg-gray-300" /> {preview && ( <div className="mt-3"> <Image src={preview} alt="Payment proof" width={200} height={200} className="rounded-md border" /> </div> )} </div> )} */}

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className={`md:col-span-2 w-full cursor-pointer text-white py-3 rounded-md transition ${
                loading ? "bg-gray-600" : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Loading..." : "Place Order"}
            </button>
          </form>

          {status && (
            <p className="my-6 text-center text-black font-medium">{status}</p>
          )}
        </div>

        {/* RIGHT: CART SUMMARY */}
        <div className="w-full md:w-1/3 bg-gray-100 py-6 px-6">
          <h3 className="text-xl font-semibold mb-4">Your Cart</h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex gap-5">
                    {item.images[0] ? (
                      <Image
                        width={100}
                        height={100}
                        className="w-[70px] h-[70px] object-cover rounded"
                        src={item.images[0]}
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-[70px] h-[70px] bg-gray-200 flex items-center justify-center text-xs">
                        No Img
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{item.name} - {item.selectedColor}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">{item.onSale ? item?.discountPrice! * item.quantity : item.price * item.quantity} PKR</p>
                </div>
              ))}

              
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Shipping:</span>
                <span>250 PKR</span>
              </div>
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total:</span>
                <span>{totalAmount + 250} PKR</span>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Checkout;
