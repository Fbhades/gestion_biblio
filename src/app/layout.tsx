import type { Metadata } from "next";
import { ClerkProvider, useUser } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import { auth } from "@clerk/nextjs/server";
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] });

const handleCreateUser = async () => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    console.log('User created:', data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const metadata: Metadata = {
  title: "RADES LIBARY",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = auth();
  if (user) { handleCreateUser() }
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
