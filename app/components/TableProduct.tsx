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
import { Product } from '@prisma/client';

interface Props {
  products: Product[];
}

const TableProduct: React.FC<Props> = ({ products }) => {
  const [sortCount, setSortCount] = useState(0);
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

  const handleSort = <T extends keyof Product>(sortBy: T) => {
    const direction = sortBy === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
  
    const sorted = [...products].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
  
      if (typeof valueA === 'string') {
        return sortDirection === 'asc' ? valueA.localeCompare(valueB as string) : (valueB as string).localeCompare(valueA as string);
      } else {
        return sortDirection === 'asc' ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
      }
    });
    
    if (sortCount >= 2) {
      setSortedProducts(products);
      setSortDirection('asc');
      setSortCount(0);
    } else {
      setSortDirection(direction);
      setSortedProducts(sorted);
      setSortCount(sortCount + 1);
    }

    console.log('DIrection' + sortCount);
  };

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
  }, [products]);

  return (
  <Paper>
    <TableContainer component={Paper} sx={{ display: 'flex', overflowX: 'hidden'}} >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{backgroundColor:'black', color:'white'}}>№</TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
              <TableSortLabel
                    style={{backgroundColor:'black', color:'white'}}
                    active={sortBy === 'name'}
                    direction={sortDirection}
                    onClick={() => handleSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
              <TableSortLabel
                  style={{backgroundColor:'black', color:'white'}}
                  active={sortBy === 'fullPrice'}
                  direction={sortDirection}
                  onClick={() => handleSort('fullPrice')}
              >
                Full Price
              </TableSortLabel>
            </TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
              <TableSortLabel
                    style={{backgroundColor:'black', color:'white'}}
                    active={sortBy === 'price'}
                    direction={sortDirection}
                    onClick={() => handleSort('price')}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
              <TableSortLabel
                    style={{backgroundColor:'black', color:'white'}}
                    active={sortBy === 'screen'}
                    direction={sortDirection}
                    onClick={() => handleSort('screen')}
              >
                Screen
              </TableSortLabel>
            </TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
              <TableSortLabel
                    style={{backgroundColor:'black', color:'white'}}
                    active={sortBy === 'capacity'}
                    direction={sortDirection}
                    onClick={() => handleSort('capacity')}
              >
                Capacity
              </TableSortLabel>
            </TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
              <TableSortLabel
                      style={{backgroundColor:'black', color:'white'}}
                      active={sortBy === 'color'}
                      direction={sortDirection}
                      onClick={() => handleSort('color')}
              >
                Color
              </TableSortLabel>
            </TableCell>
            <TableCell style={{backgroundColor:'black', color:'white'}}>
              <TableSortLabel
                      style={{backgroundColor:'black', color:'white'}}
                      active={sortBy === 'year'}
                      direction={sortDirection}
                      onClick={() => handleSort('year')}
              >
                Year
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" style={{backgroundColor:'black', color:'white'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
            <TableRow key={product.id}>
              <TableCell style={{ width: 80 }}>{products.findIndex(e => e === product) + 1}</TableCell>
              <TableCell style={{ width: 400 }}>{product.name}</TableCell>
              <TableCell>{product.fullPrice}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell style={{ width: 160 }}>{product.screen}</TableCell>
              <TableCell>{product.capacity}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>{product.year}</TableCell>
              <TableCell>
              <Box sx={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', gap: 1 }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(product.id)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)} sx={{ mt: 1 }}>Delete</Button>
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

export default TableProduct;