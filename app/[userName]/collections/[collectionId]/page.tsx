'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Collection, Product } from '@/lib/types';
import CollectionDetails from '@/components/collection-details';
import { ProductCard } from '@/components/product-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

export default function CollectionModal({ params }: { params: { userName: string; collectionId: string } }) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUserName(resolvedParams.userName);
      // Fetch collection and products data here
      const fetchedCollection: Collection = {
        id: resolvedParams.collectionId,
        name: 'Sample Collection',
        description: 'This is a sample collection description.',
        productCount: 99,
        image: 'https://via.placeholder.com/150'
      };
      setCollection(fetchedCollection);
      const fetchedProducts: Product[] = [
        {
          id: 'product-1',
          name: 'Product 1',
          description: 'Description for product 1',
          price: 100,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-2',
          name: 'Product 2',
          description: 'Description for product 2',
          price: 200,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-3',
          name: 'Product 3',
          description: 'Description for product 3',
          price: 300,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-4',
          name: 'Product 4',
          description: 'Description for product 4',
          price: 400,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-5',
          name: 'Product 5',
          description: 'Description for product 5',
          price: 500,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-6',
          name: 'Product 6',
          description: 'Description for product 6',
          price: 600,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-7',
          name: 'Product 7',
          description: 'Description for product 7',
          price: 700,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-8',
          name: 'Product 8',
          description: 'Description for product 8',
          price: 800,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-9',
          name: 'Product 9',
          description: 'Description for product 9',
          price: 900,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 'product-10',
          name: 'Product 10',
          description: 'Description for product 10',
          price: 1000,
          image: 'https://via.placeholder.com/150'
        }
      ];
      setProducts(fetchedProducts);
    };


    fetchParams();
  }, [params]);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative z-60 flex w-full max-w-7xl bg-white rounded-lg shadow-lg">
        <button className="absolute top-4 right-4" onClick={handleClose}>
          <X className="h-6 w-6" />
        </button>
        <div className='flex w-full mt-16'>
          <div className="flex w-full" style={{height: '42rem'}}>
            <div className="w-1/2 p-4">
              {collection && <CollectionDetails params={{ userName, collection }} />}
            </div>
            <div className="w-1/2 p-4 overflow-y-auto">
              <ScrollArea>
                <div className="grid grid-cols-1 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="animate-slide-up">
                      <ProductCard userName={userName} product={product} />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}


