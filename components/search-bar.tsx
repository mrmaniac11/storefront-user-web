'use client';

import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBar(param) {   
  const onClear = () => {
    param.setInput('');
  }
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative">
        <Search className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={`Search ${param.searchTitle}`}
          value={param.inputValue}
          className="pl-10 w-full border-none focus:outline-none focus:ring-0"
          onChange={(e) => param.setInput(e.target.value)}
          showClear={param.showClear}
          onClear={onClear}
        />
      </div>
    </div>
  );
}