import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "../components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import ModalSlot from "@/app/@modal/components/ModalSlot";
import UserProvider from "@/context/user-provider";
import { cn } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patch Wallet Integration Example",
  description:
    "An example of how to integrate Patch Wallet into your app with clerk as auth provider.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en">
          <body className={cn(inter.className, "light")}>
            <div className="flex min-h-screen flex-col">
              <Nav />
              {children}
              <Footer />
              <ModalSlot>{modal}</ModalSlot>
            </div>
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}
