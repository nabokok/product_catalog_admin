import prisma from "@/lib/prisma";

export const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export default async function Home() {
  const products = await getProducts();
  console.log(products)
  return (
    <main>
    Hello
    </main>
  );
}
