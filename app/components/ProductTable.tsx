"use client";
import React, { useEffect, useState } from 'react';
import { Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TableSortLabel,
  TablePagination,
  Button,
  Box,
} from '@mui/material';

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
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEdit = (id: string) => {
    console.log(`Edit ID №: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete ID №: ${id}`);
  };

  const handleSort = (sortBy: string) => {
    console.log(sortBy);
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const sorted = [...products];
    setSortedProducts(sorted);
  }, [products, sortBy, sortDirection]);

  return (
  <Paper>
    <TableContainer component={Paper} sx={{ display: 'flex', overflowX: 'hidden' }} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Number</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
            <TableSortLabel
                  style={{backgroundColor:'black', color:'white'}}
                  active={sortBy === 'id'}
                  direction={sortDirection}
                  onClick={() => handleSort('id')}
                >
              Name
              </TableSortLabel>
              </TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Full Price</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Price</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Screen</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Capacity</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Color</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>RAM</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Year</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>Change item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
            <TableRow key={product.id}>
              <TableCell>{products.findIndex(e => e === product) + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.fullPrice}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.screen}</TableCell>
              <TableCell>{product.capacity}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>{product.ram}</TableCell>
              <TableCell>{product.year}</TableCell>
              <TableCell>
              <Box sx={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', gap: 1 }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(product.id)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>Delete</Button>
                  </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    style={{backgroundColor:'black', color:'white'}}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      >
      </TablePagination>
    </Paper>
  );
}

export default ProductsTable;