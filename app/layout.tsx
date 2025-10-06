import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Circle Resources",
  description: "Secure access to exclusive resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
