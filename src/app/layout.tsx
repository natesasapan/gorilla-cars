import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Gorilla Cars",
  description: "Go bananas for our low prices!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
