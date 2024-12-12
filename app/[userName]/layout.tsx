'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { UserDrawer } from '@/components/user-drawer';
import {SearchBar} from '@/components/search-bar';
import {TabSection} from '@/components/tab-section';

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userName: string };
}) {
  // const { userName } = await params;

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
  const [user, setUser] = useState<User>(userObject);
  const [activeTab, setActiveTab] = useState<'products' | 'collections'>('products');
  const [currentPartURI, setCurrentPartURI] = useState<string>('products');
  const router = useRouter();

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUserName(resolvedParams.userName);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (userName) {
      const fetchUserData = async () => {
        setUser({
          name: "John Doe",
          productCount: 156,
          collectionCount: 23,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        });
        router.push(`/${userName}/${currentPartURI}`);
      };
      fetchUserData();
    }
  }, [userName, router]);

  const redirectToCurrentActivePage = async (currentPartURI: string) => {
    setActiveTab(currentPartURI as 'products' | 'collections');
    router.push(`/${userName}/${currentPartURI}`);
  }

  return (
    <div className="container mx-auto">
      <div className="fixed top-0 left-0 w-full bg-background z-50 py-4">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <span className="text-green-500 font-bold text-xl">LinkFit</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDrawerOpen(true)}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
        <UserDrawer
          user={user}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
        <SearchBar />
        <section className="py-4 mx-10">
          <TabSection
            productCount={user?.productCount}
            collectionCount={user?.collectionCount}
            activeTab={activeTab}
            onTabChange={(value) => redirectToCurrentActivePage(value)}
          />
        </section>
      </div>
      <section className="py-4 min-h-[70vh]" style={{marginTop: '20vh'}}>
        {children}  
      </section>
    </div>
  );
}