import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Product {
  id: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  products: Product[];
}

const ProductsTable: React.FC<Props> = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Full Price</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Screen</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>RAM</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.fullPrice}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.screen}</TableCell>
              <TableCell>{product.capacity}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>{product.ram}</TableCell>
              <TableCell>{product.year}</TableCell>
              <TableCell>{product.image}</TableCell>
              <TableCell>{product.createdAt.toString()}</TableCell>
              <TableCell>{product.updatedAt.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable;