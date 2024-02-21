import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Nav from "../components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/libs/utils";
import { Providers } from "@/context/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patch Wallet",
  description:
    "A Wallet on top of your social handle. Use your Twitter, GitHub, Email, or Phone as your personal crypto wallet without the complexity. Let anyone send you tokens via your social handle.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <div className="flex min-h-screen flex-col">
          <Providers>
            <Nav />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
