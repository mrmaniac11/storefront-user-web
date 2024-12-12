'use client'

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';


interface ProductDetailsProps {
  params: {
    userName: string;
    product: Product | null;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { product, userName } = params;
  if (!product) {
    return <div>No product details available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <div className="relative h-64 w-full max-w-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-lg text-muted-foreground mt-2">{product.description}</p>
        <p className="text-xl font-semibold mt-4">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductDetails;