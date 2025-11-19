'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Link from 'next/link';

interface ProductTableProps {
  products: Product[]; // categories with products
}

export default function ProductTable({ products }: ProductTableProps) {

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
      if (res.status === 200) {
        alert("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const columns: GridColDef<any>[] = [

    {
    field: 'image',
    headerName: 'Image',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      params.row.images && params.row.images.length > 0 ? (
        <img
          src={params.row.images[0]}
          alt={params.row.name}
          style={{ width: 60, height: 60, objectFit: 'cover'}}
        />
      ) : (
        <span>No Image</span>
      )
    ),
  },
    { field: 'name', headerName: 'Product Name', flex: 1, minWidth: 100 },
    { field: 'price', headerName: 'Price', type: 'number', width: 100, },
    {
      field: 'newPrice',
      headerName: 'Discount Price',
      type: 'number',
      width: 130,
      renderCell: (params) => params.row.newPrice || '-',
    },
    {
      field: 'onSale',
      headerName: 'Sale',
      width: 80,
      type: 'boolean',
    },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 80,
      type: 'boolean',
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 80,
      type: 'number',
    },
    {
      field: 'colors',
      headerName: 'Colors',
      width: 320,
      renderCell: (params) => params.row.colors.join(", "),
    },
    {
      field: 'collection',
      headerName: 'Category',
      width: 220,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary">
            <Link href={`/admin-dashboard/update-product/${params.row._id}`}><FaEdit /></Link>
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <FaTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 2, borderRadius: 2 }}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id} 
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 10, 20]}
        showToolbar
        disableRowSelectionOnClick
      />
    </Box>
  );
}
