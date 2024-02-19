import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "../components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import UserProvider from "@/context/user-provider";
import { cn } from "@/libs/utils";
import { ModalProvider } from "@/context/modal-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patch Wallet",
  description:
    "A Wallet on top of your social handle. Use your Twitter, GitHub, Email, or Phone as your personal crypto wallet without the complexity. Let anyone send you tokens via your social handle.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "light")}>
        <div className="flex min-h-screen flex-col">
          <UserProvider>
            <ModalProvider>
              <ClerkProvider>
                <Nav />
                {children}
                <Footer />
                <div id="modal" />
              </ClerkProvider>
            </ModalProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
