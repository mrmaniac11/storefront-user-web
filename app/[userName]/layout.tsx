'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setUser } from '@/lib/slices/userSlice';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { UserDrawer } from '@/components/user-drawer';
import { SearchBar } from '@/components/search-bar';
import { TabSection } from '@/components/tab-section';
import networkService from '@/lib/network';
import { Search } from "lucide-react";

function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userName: string };
}) {

  interface User {
    name: string;
    productCount: number;
    collectionCount: number;
    avatar: string;
  }

  const userObject = {
    name: '',
    productCount: 0,
    collectionCount: 0,
    avatar: ''
  }
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'collections'>('products');
  const [currentPartURI, setCurrentPartURI] = useState<string>('products');
  const [canShowSearchBar, setCanShowSearchBar] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const searchBarRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useOutsideClick(searchBarRef, () => {    
    if (!searchText) {
      setCanShowSearchBar(false);
    }
  });

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUserName(resolvedParams.userName);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    const getUserData = async () => {
      if (userName) {
        let userNameResponse = {};
        userNameResponse = networkService.get('/meta', {
          user_name: userName
        });
        if (userNameResponse?.user_name || true) {
          const fetchUserData = async () => {
            dispatch(setUser({
              name: userName,
              productCount: 44,
              collectionCount: 56,
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }));
            router.push(`/${userName}/${currentPartURI}`);
          };
          fetchUserData();
        }
      }
    }
    getUserData();  
  }, [userName, router]);

  
  const redirectToCurrentActivePage = async (currentPartURI: string) => {
    setCurrentPartURI(currentPartURI);
    setActiveTab(currentPartURI as 'products' | 'collections');
    router.push(`/${userName}/${currentPartURI}`);
  }

  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full bg-background z-50">
        <div className="mx-auto bg-green-500">
          <div className="px-4 h-16 flex items-center justify-between">
            <div>
              <span className="text-white font-bold text-2xl">LinkFit</span>
            </div>
            {canShowSearchBar && (
              <div ref={searchBarRef} className="absolute top-0 left-0 w-full">
                <SearchBar searchTitle={currentPartURI} setInput={setSearchText} inputValue={searchText} showClear={!!searchText}/>
                </div>
            )}

            <div className="flex items-center">
              {!canShowSearchBar && (
                <Search className="text-white h-5 w-5 me-5" onClick={() => setCanShowSearchBar(true)}/>
              )}
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(true)}
                className="user-text"
                >
              <User className="h-5 w-5" />
                </Button>
            </div>
            
          </div>
        </div>
        <UserDrawer
          user={user}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
        <div className="container py-4 mx-auto px-4">
          <TabSection
            activeTab={activeTab}
            onTabChange={(value) => redirectToCurrentActivePage(value)}
          />
        </div>
      </div>
      <section style={{marginTop: '20vh'}}>
        {children}  
      </section>
    </div>
  );
}