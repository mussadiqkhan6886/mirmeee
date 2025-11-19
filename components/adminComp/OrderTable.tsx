"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Order {
  _id: string;
  items: {
    images: string;
    name: string;
    quantity: number;
    selectedColor: string
    selectedSize: string
  }[];
  orderId: string;
  userDetails: {
    fullName: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    city: string;
    postalCode: string;
    address: string;
  };
  totalPrice: number;
  status: string;
  // paymentMethod: string;
  // paymentProof?: string;
  createdAt: string;
}

export default function OrderTable({ orders }: { orders: Order[] }) {
  const [rows, setRows] = React.useState(() =>
    orders.map((order) => ({
      id: order._id,
      orderId: order.orderId,
      userName: order.userDetails.fullName,
      email: order.userDetails.email,
      phone: order.userDetails.phone,
      totalPrice: order.totalPrice,
      status: order.status,
      // paymentMethod: order.paymentMethod,
      // paymentProof: order.paymentProof || "",
      date: new Date(order.createdAt).toLocaleDateString(),
      address: order.shippingAddress.address,
      items: order.items,
    }))
  );

  const [updating, setUpdating] = React.useState(false);

  const deleteOrder = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/order/${id}`);
      if (res.data.success) {
        setRows((prev) => prev.filter((order) => order.id !== id));
      } else {
        alert("Failed to delete order");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 100 },
    {
      field: "items",
      headerName: "Items",
      width: 600,
      renderCell: (params) => (
        <div className="flex gap-2">
           {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {params.value.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <Image
                src={item.images}
                alt={item.name}
                width={40}
                height={40}
                className="rounded-md object-cover border"
              />
              <span className="text-sm">{item.name} × {item.quantity} - ({item.selectedColor || item.selectedSize})</span>
            </div>
          ))}
        </div>
      ),
    },
    { field: "userName", headerName: "Customer", width: 140 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "totalPrice", headerName: "Total (Rs)", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 170,
      renderCell: (params) => {
        const getColor = (status: string) => {
          switch (status) {
            case "pending":
              return "#facc15"; // yellow
            case "processing":
              return "#60a5fa"; // blue
            case "shipped":
              return "#34d399"; // green
            case "delivered":
              return "#22c55e"; // bright green
            case "cancelled":
              return "#f87171"; // red
            default:
              return "#9ca3af"; // gray
          }
        };

        const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
          const newStatus = e.target.value;
          setUpdating(true);
          try {
            const res = await axios.patch(`/api/order/${params.row.id}`, { status: newStatus });
            if (res.data.success) {
              params.api.updateRows([{ ...params.row, status: newStatus }]);
            } else {
              alert("Failed to update status");
            }
          } catch (error) {
            console.error(error);
            alert("Error updating status");
          } finally {
            setUpdating(false);
          }
        };

        const currentColor = getColor(params.value);

        return (
          <select
            disabled={updating}
            value={params.value}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold focus:outline-none"
            style={{
              backgroundColor: currentColor,
              color: "white",
              textTransform: "capitalize",
            }}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        );
      },
    },
    // { field: "paymentMethod", headerName: "Payment", width: 130 },
//     {
//   field: "paymentProof",
//   headerName: "Payment Proof",
//   width: 160,
//   renderCell: (params) =>
//     params.value ? (
//       <Link
//         href={params.value}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Image
//           src={params.value}
//           alt="Payment Proof"
//           width={50}
//           height={50}
//           className="rounded border object-cover"
//         />
//       </Link>
//     ) : (
//       <span className="text-gray-400 text-sm">No Proof</span>
//     ),
// },
    { field: "date", headerName: "Date", width: 120 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "address", headerName: "Address", width: 280 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton color="error" onClick={() => deleteOrder(params.row.id)}>
            <FaTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <h2 className="text-2xl text-center mt-3 font-semibold mb-3">Orders</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
}
