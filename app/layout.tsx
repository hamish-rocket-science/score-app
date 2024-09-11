import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Gamepad2 } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Score App",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Header = () => (
  <header className="bg-stone-900 text-white p-4 sticky top-0 flex gap-2">
    <Gamepad2 />
    <div className="font-extrabold">Score App</div>
  </header>
);

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
