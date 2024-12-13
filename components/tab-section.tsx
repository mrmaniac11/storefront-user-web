'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";

type Tab = 'products' | 'collections';
interface TabSectionProps {
  productCount: number;
  collectionCount: number;
  activeTab: 'products' | 'collections';
  onTabChange: (value: Tab) => void;
}

export function TabSection({ productCount, collectionCount, activeTab, onTabChange }: TabSectionProps) {
  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="w-full max-w-64 mx-auto">
        <TabsTrigger value="products" className="flex-1" onClick={() => onTabChange('products')}>
          Products
          {/* <Badge variant="secondary" className="ml-2">{productCount}</Badge> */}
        </TabsTrigger>
        <TabsTrigger value="collections" className="flex-1" onClick={() => onTabChange('collections')}>
          Collections
          {/* <Badge variant="secondary" className="ml-2">{collectionCount}</Badge> */}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}