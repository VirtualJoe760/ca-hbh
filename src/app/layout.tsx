// src/app/layout.tsx
"use client";
import "./globals.css";

import Nav from "./components/Nav";
import ThemeProvider from "./components/ThemeProvider";

import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-afacad">
        <ThemeProvider>
          <SessionProvider>
            <Nav />
            
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
