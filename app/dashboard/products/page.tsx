'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ProductsFilters } from '@/components/dashboard/products/products-filters';
import { ProductsTable } from '@/components/dashboard/products/products-table';
import { ProductWithCategory } from '@/types/ProductWithCategory';
import { paths } from '@/constants/paths';
import { useRouter } from 'next/navigation';


export interface ProductsFilter {
  page: number,
  perPage: number,
}

const productsFilterInitialState = { page: 0, perPage: 5 }

export default function Page(): React.JSX.Element {
  const [products, setProducts] = useState<{ productsList: ProductWithCategory[], count: number }>({
    productsList: [],
    count: 0
  });
  const [productsFilter, setProductsFilter] = useState<ProductsFilter>(productsFilterInitialState);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/products', {
        params: {
          perPage: productsFilter.perPage,
          page: productsFilter.page
        }
      });
      setProducts({
        productsList: response.data.productsPerPage,
        count: response.data.productsCount
      });
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [productsFilter]);

  const handleFilter = (filter: Partial<ProductsFilter>) => {
    setProductsFilter(prev => ({ ...prev, ...filter }));
  }

  const bulkDelete = async () => {
    try {
      await axios.delete('/api/products', { data: { ids: selectedProducts } });
      fetchData();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }

  const productDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchData();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Products</Typography>
        </Stack>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="contained">
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selectedProducts.length === 0}
            onClick={bulkDelete}
          >
            Delete
          </Button>
        </div>
      </Stack>
      <ProductsFilters />
      <ProductsTable
        count={products.count}
        page={productsFilter.page}
        rows={products.productsList}
        rowsPerPage={productsFilter.perPage}
        onFilter={handleFilter}
        setSelectedProducts={setSelectedProducts}
        onDelete={productDelete}
      />
    </Stack>
  );
}
