import "global.css";

import { APP_DESCRIPTION, APP_NAME, APP_URL } from "lib/meta";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
  },
  twitter: {
    card: "summary_large_image",
    site: APP_URL,
    creator: "@ryanm",
  },
  openGraph: {
    url: APP_URL,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/favicon.svg`,
      },
    ],
    siteName: APP_NAME,
  },
  alternates: {
    canonical: APP_URL,
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-800 dark:bg-gray-800 dark:text-whiteAlpha-900">
        <SessionProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
