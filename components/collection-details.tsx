'use client'

import React from 'react';
import Image from 'next/image';
import { Collection } from '@/lib/types';


interface CollectionDetailsProps {
  params: {
    userName: string;
    collection: Collection | null;
  };
}

const CollectionDetails: React.FC<CollectionDetailsProps> = ({ params }) => {
  const { collection, userName } = params;
  if (!collection) {
    return <div>No collection details available.</div>;
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="flex flex-col items-center">
        <div className="relative h-64 w-full max-w-lg">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">{collection.name}</h1>
        <p className="text-lg text-muted-foreground mt-2">{collection.description}</p>
        <p className="text-xl font-semibold mt-4">${collection.productCount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CollectionDetails;