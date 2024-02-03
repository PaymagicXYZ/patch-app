import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <h1 className="text-[40px] text-gray-100">Profile not found</h1>
      <p className="text-center text-gray-700">TRY AGAIN</p>
      <div></div>
      <Link href="/" className="mt-32">
        <Button className="w-80  bg-gray-850 text-gray-200 hover:bg-gray-850/80">
          <div className="flex w-full items-center justify-between">
            <p>Go back to the home page</p>
            <ArrowRight className="text-gray-100" />
          </div>
        </Button>
      </Link>
    </main>
  );
}
