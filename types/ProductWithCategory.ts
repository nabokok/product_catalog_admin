import { Category, Product } from "@prisma/client";

export interface ProductWithCategory extends Product {
    category: Category;
}