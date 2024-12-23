'use client'

import React , { useEffect, useState } from "react";
import { Collection } from "@/lib/types";
import InfiniteScroll from 'react-infinite-scroll-component';
import { generateMockCollections } from '@/lib/mock-data';
import { CollectionCard as CollectionCardComponent } from '@/components/collection-card';
import networkService from '@/lib/network';
import store from '@/lib/store';
import { RootState } from '@/lib/store';

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
  const state: RootState = store.getState(); // Get the current state from the Redux store
  const user = state.user; // Get the user object from the state

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
  }, [user]);

  const resetData = () => {
    return () => {
      setUserName('');
      setCollectionList([]);
      setCollectionPage(0);
      setHasMoreCollections(true);
      setIsCollectionLoading(true);
    };
  }

  const fetchCollections = async () => {
    if (user) {
      console.log('fetching collections');
      setIsCollectionLoading(true);
      const nextPage = collectionPage + 1;
      setCollectionPage(nextPage);
      try {
        const collections = await networkService.get('/collections') || [];
        setCollectionList([...collectionList, ...collections]);
      } catch (error) {
        // Handle catch error
      } finally { 
        const data = await generateMockCollections(nextPage, 30);
        if (data.length < 30) {
          setHasMoreCollections(false);
        }
        setCollectionList([...collectionList, ...data]);
        setIsCollectionLoading(false);  
      }
    }
  };

  return (
    <InfiniteScroll
      dataLength={collectionList.length}
      next={fetchCollections}
      hasMore={hasMoreCollections}
      loader={<></>}
      endMessage={ !isCollectionLoading && <p className="text-center py-4">No more collections</p>}
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
      <div className="flex justify-center py-8 mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )}

    </InfiniteScroll>
  );
}
