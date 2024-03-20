import ProductTable from './components/ProductTable';
import Products, { getProducts } from "./components/Products";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <Products />
      <ProductTable products={products}/>
    </main>
  );
}
