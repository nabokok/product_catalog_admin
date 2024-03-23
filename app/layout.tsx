// Layout.tsx

import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Providers } from '@/components/Providers';

export const viewport = { width: 'device-width', initialScale: 1 } as Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LocalizationProvider>
            <UserProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </UserProvider>
          </LocalizationProvider>
        </Providers>
      </body>
    </html>
  );
}
