import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'products', title: 'Products', href: paths.dashboard.products, icon: 'users' },
  { key: 'category', title: 'Category', href: paths.dashboard.category, icon: 'user' },
] satisfies NavItemConfig[];
