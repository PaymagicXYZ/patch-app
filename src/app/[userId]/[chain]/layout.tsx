"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SendModalSlot from "./@send/components/SendModalSlot";

export default function Layout({
  children,
  send,
}: {
  children: React.ReactNode;
  send: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main className="px-6">
      <header className="text-gray-500">
        <Link href={`${pathname}/send`} prefetch>
          Send
        </Link>
      </header>
      {children}
      <SendModalSlot>{send}</SendModalSlot>
    </main>
  );
}
