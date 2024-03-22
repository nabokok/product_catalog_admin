import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Providers } from '@/components/Providers';

export const viewport = { width: 'device-width', initialScale: 1 } as Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <Providers>
      <html lang="en">
        <body>
          <LocalizationProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </LocalizationProvider>
        </body>
      </html>
    </Providers>
  );
}
