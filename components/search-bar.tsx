'use client';

import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBar() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search products and collections..."
          className="pl-10 w-full"
        />
      </div>
    </div>
  );
}