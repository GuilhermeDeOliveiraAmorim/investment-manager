"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { Header } from "@app/components/header";
import { Footer } from "@app/components/footer";
import { Container } from "@app/components/container";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="flex-1">
            <Container>{children}</Container>
          </main>
          <Toaster />
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
