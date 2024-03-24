export const paths = {
  home: '/dashboard/products',
  auth: { signIn: '/auth/sign-in' },
  dashboard: {
    products: '/dashboard/products',
    newProduct: '/dashboard/products/new',
    category: '/dashboard/category',
  },
} as const;
