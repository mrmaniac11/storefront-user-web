'use client'

import React , { useEffect, useState } from "react";
import { Collection } from "@/lib/types";
import InfiniteScroll from 'react-infinite-scroll-component';
import { generateMockCollections } from '@/lib/mock-data';
import { CollectionCard as CollectionCardComponent } from '@/components/collection-card';

export default function CollectionCard({
  params,
}: {
  params: { userName: string };
}) {

  const [userName, setUserName] = useState<string>('');
  const [collectionList, setCollectionList] = useState<Collection[]>([]);
  const [collectionPage, setCollectionPage] = useState<number>(0);
  const [hasMoreCollections, setHasMoreCollections] = useState<boolean>(true);
  const [isCollectionLoading, setIsCollectionLoading] = useState<boolean>(true);

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
    fetchCollections();
  }, []);

  const resetData = () => {
    return () => {
      setUserName('');
      setCollectionList([]);
      setCollectionPage(0);
      setHasMoreCollections(true);
      setIsCollectionLoading(false);
    };
  }

  const fetchCollections = async () => {
    setIsCollectionLoading(true);
    const nextPage = collectionPage + 1;
    setCollectionPage(nextPage);
    console.log('fetching collections', nextPage)
    const data = await generateMockCollections(nextPage, 30)  
    if (data.length < 30) {
      setHasMoreCollections(false);
    }
    setCollectionList([...collectionList, ...data]);
    setIsCollectionLoading(false);

  };

  return (
      <div style={{ height: '80vh'}}>
          <InfiniteScroll
            dataLength={collectionList.length}
            next={fetchCollections}
            hasMore={hasMoreCollections}
            loader={<></>}
            endMessage={<p className="text-center py-4">No more products</p>}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {collectionList.map((collection, index) => (
                  <div
                    key={collection.id}
                    className="fade-in"
                    style={{ animationDelay: `${index % 10 * 0.1}s` }}
                  >
                    <CollectionCardComponent userName={userName} collection={collection as Collection} />
                  </div>
                ))}
            </div>
            {isCollectionLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}

          </InfiniteScroll>
      </div>
  );
}
