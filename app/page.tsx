import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Discover amazing products and collections
      </p>
      <Link href="/demo-user">
        <Button>
          View Demo Store
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}