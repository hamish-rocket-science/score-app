import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Gamepad2, Joystick, User } from "lucide-react";
import Link from "next/link";
import { MaxWidth } from "@/components/max-width";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Score App",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Header = () => (
  <header className="bg-stone-900 text-white py-4 sticky top-0 z-50">
    <MaxWidth>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Gamepad2 size={32} />
          <div className="font-extrabold text-sm"></div>
        </div>
        <nav>
          <ul className="flex gap-4 text-sm text-white/90">
            <li>
              <Link className="flex items-center gap-1" href="/">
                <Joystick size={14} /> Games
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-1" href="/players">
                <User size={14} /> Players
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </MaxWidth>
  </header>
);

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
