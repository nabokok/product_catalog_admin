"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '@prisma/client';
import {
  Box, Button, Typography,
} from '@mui/material';
import { DataGrid, gridClasses, } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

type Props = {
  products: Product[];
}

const ProductsTable: React.FC<Props> = ({ products }) => {
  const handleEdit = (productId: string) => {
    // Edit product
    console.log('Edit product with id:', productId);
  };

  const handleDelete = (productId: string) => {
    // Delete product
    console.log('Delete product with id:', productId);
  };

  const columns = useMemo(()=>[
    {field:'name', headerName:'Name', width:400},
    {field:'fullPrice', headerName:'Full Price', width:100},
    {field:'price', headerName:'Price', width:100},
    {field:'screen', headerName:'Screen', width:160},
    {field:'capacity', headerName:'Capacity', width:120},
    {field:'color', headerName:'Color', width:120},
    {field:'year', headerName:'Year', width:100},
    {field: 'id', headerName: 'ID', width: 80, sortable: false, filterable: false},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 162,
      renderCell: (params: any) => (
        <Box>
          <Button variant="contained" color="primary" sx={{ marginRight: 0.2 }} onClick={() => handleEdit(params.row.id)}>Edit</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </Box>
      ),
    },
  ], [])
  
  return (
    <Box
    sx={{
      height:800,
      width:1400,
    }}
    >
      <Typography
      variant='h3'
      component='h3'
      sx={{textAlign:'center', mt:2, mb:2}}
      >

      </Typography>
    <DataGrid
      columns={columns}
      rows={products}
      getRowId={row => row.id}
      pageSizeOptions={[10, 15, 25, 50, 100]}
      getRowSpacing={params => ({
        top:params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      })}
      sx={{
        [`&.${gridClasses.row}`]:{
          bgcolor: theme => theme.palette.mode === 'light' ? grey[200] : grey[900],
        }
      }}
    />
    </Box>
  );
};

export default ProductsTable;