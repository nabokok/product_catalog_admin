export const paths = {
  home: '/dashboard/products',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    products: '/dashboard/products',
    category: '/dashboard/category',
  },
} as const;
