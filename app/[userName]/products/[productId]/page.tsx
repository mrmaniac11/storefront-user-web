'use client'

import React, { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { useRouter } from 'next/navigation'
import ProductDetailss from '@/components/product-details';


export default function ProductDetails({
  params,
}: {
  params: { userName: string; productId: string };
}) {

  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUserName(resolvedParams.userName);
      setProductId(resolvedParams.productId);
    };

    fetchParams();
  }, []);
  
  useEffect(() => {
    const product: Product = {
      id: productId,
      name: 'Sample Product',
      description: 'This is a sample product description.',
      price: 99.99,
      image: 'https://via.placeholder.com/150'
    };

    setProduct(product as Product);
  }, []);

  return <ProductDetailss params={{ userName: userName, product: product }} />;}


