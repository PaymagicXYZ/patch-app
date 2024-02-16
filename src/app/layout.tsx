import "./globals.css";
import "../../shim";
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
  title: "Patch Wallet Integration Example",
  description:
    "An example of how to integrate Patch Wallet into your app with clerk as auth provider.",
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
