import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/constants/paths';

export const navItems = [
  { key: 'products', title: 'Products', href: paths.dashboard.products },
  { key: 'category', title: 'Category', href: paths.dashboard.category },
] satisfies NavItemConfig[];
