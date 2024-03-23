// import { redirect } from 'next/navigation';

// export default function Page(): never {
//   redirect('/dashboard/products');
// }
'use client';
import { getUserSession } from '@/lib/session';
import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import ProductsTable from './components/ProductsTable';

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

  console.log(products);
  return (
    <main className="">
      <ProductsTable products={products} />
    </main>
  );
}
