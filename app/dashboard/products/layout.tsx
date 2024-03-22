import * as React from 'react';
import { config } from '@/config';
import { Metadata } from 'next';

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata = { title: `Products | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Layout({ children }: LayoutProps): React.JSX.Element {
    return (
        <>
            {children}
        </>
    );
}
