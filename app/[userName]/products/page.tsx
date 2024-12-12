'use client'

import React , { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import InfiniteScroll from 'react-infinite-scroll-component';
import { generateMockProducts } from '@/lib/mock-data';
import { ProductCard as ProductCardComponent } from '@/components/product-card';

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
    // generate mock products
    resetData()
    fetchProducts();
  }, []);

  const resetData = () => {
    setUserName('');
    setProductList([]);
    setProductPage(0);
    setHasMoreProducts(true);
    setIsProductLoading(false);
  }

  const fetchProducts = async () => {
    setIsProductLoading(true);
    const nextPage = productPage + 1;
    setProductPage(nextPage);
    console.log('fetching products', nextPage)
    const data = await generateMockProducts(nextPage, 30)  
    if (data.length < 30) {
      setHasMoreProducts(false);
    }
    setProductList([...productList, ...data]);
    setIsProductLoading(false);

  };

  return (
      <div style={{ height: '80vh'}}>
          <InfiniteScroll
            dataLength={productList.length}
            next={fetchProducts}
            hasMore={hasMoreProducts}
            loader={<></>}
            endMessage={<p className="text-center py-4">No more products</p>}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {productList.map((product, index) => (
                  <div
                    key={product.id}
                    className="fade-in"
                    style={{ animationDelay: `${index % 10 * 0.1}s` }}
                  >
                    <ProductCardComponent userName={userName} product={product as Product} />
                  </div>
              ))}
            </div>
            {isProductLoading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              )}

          </InfiniteScroll>
      </div>
  );
}