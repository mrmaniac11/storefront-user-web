'use client'

import React , { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import InfiniteScroll from 'react-infinite-scroll-component';
import { generateMockProducts } from '@/lib/mock-data';
import { ProductCard as ProductCardComponent } from '@/components/product-card';
import networkService from '@/lib/network';
import store from '@/lib/store';
import { RootState } from '@/lib/store';

export default function ProductCard({
  params,
}: {
  params: { userName: string };
}) {

  const [userName, setUserName] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>([]);
  const [productPage, setProductPage] = useState<number>(0);
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const [currentEnlargedProduct, setCurrentEnlargedProduct] = useState<Product | null>(null);
  const [currentEnlargedProductIndex, setCurrentEnlargedProductIndex] = useState<number>(0);
  const state: RootState = store.getState();
  const user = state.user;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUserName(resolvedParams.userName);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    resetData();
      fetchProducts();
  }, [user]);

  const resetData = () => {
    setUserName('');
    setProductList([]);
    setProductPage(0);
    setHasMoreProducts(true);
    setIsProductLoading(true);
  };

  const fetchProducts = async () => {    
    if (user) {
      console.log('fetching products');
      setIsProductLoading(true);
      const nextPage = productPage + 1;
      setProductPage(nextPage);
      try {
        const data = await networkService.get('/products') || [];
        setProductList([...productList, ...products]);
      } catch (error) {
        // Handle catch error
      } finally {
        const data = await generateMockProducts(nextPage, 30);
        if (data.length < 30) {
          setHasMoreProducts(false);
        }
        setProductList([...productList, ...data]);
        setIsProductLoading(false);
      }
    }
  };

  const hasReachedEndOfList = (index: number) => {
    if (index === productList.length - 10) {
      fetchProducts();
    }
  }
  const handleProductNavigation = (index, direction) => {
      if (direction === 'next') {
        setCurrentEnlargedProduct(productList[index + 1]);
        setCurrentEnlargedProductIndex(index + 1);
      } else if (direction === 'prev') {
        setCurrentEnlargedProduct(productList[index - 1]);
        setCurrentEnlargedProductIndex(index - 1);
      }
      if (hasReachedEndOfList(index)) {
        setCurrentEnlargedProductIndex(0);
      }
  }

  return (
    <InfiniteScroll
      dataLength={productList.length}
      next={fetchProducts}
      hasMore={hasMoreProducts}
      loader={<></>}
      endMessage={ !isProductLoading &&  <p className="text-center py-4">No more products</p>}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {productList.map((product, index) => (
          <div
            key={product.id}
            className="fade-in"
            style={{ animationDelay: `${index % 10 * 0.1}s` }}
          >
            <ProductCardComponent
              userName={userName}
              product={product}
              index={index}
              currentEnlargedProductIndex={currentEnlargedProductIndex}
              setCurrentEnlargedProductIndex={setCurrentEnlargedProductIndex}
              currentEnlargedProduct={currentEnlargedProduct}
              setCurrentEnlargedProduct={setCurrentEnlargedProduct}
              hasPrevProduct={currentEnlargedProductIndex > 0}
              hasNextProduct={currentEnlargedProductIndex < productList.length - 1}
              handleProductNavigation={handleProductNavigation}
            />
          </div>
        ))}
      </div>
      {isProductLoading && (
        <div className="flex justify-center pt-8 mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      )}
    </InfiniteScroll>
  );
}