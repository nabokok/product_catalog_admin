"use client";
import { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import Products from './components/Products';
import { Product } from '@prisma/client';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main>
      <Products />
      <ProductTable products={products}/>
    </main>
  );
}
