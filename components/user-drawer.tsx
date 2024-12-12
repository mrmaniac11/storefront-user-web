'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/lib/types";
import { Package } from "lucide-react";

interface UserDrawerProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export function UserDrawer({ user, open, onClose }: UserDrawerProps) {
  return (
    <>
      { user !==  null &&
        <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="max-w-100">
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <div className="flex items-center gap-2 p-4 bg-secondary rounded-lg">
                <Package className="h-5 w-5" />
                <div>
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="font-semibold">{user.productCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 bg-secondary rounded-lg">
                {/* <Collection className="h-5 w-5" /> */}
                <div>
                  <p className="text-sm text-muted-foreground">Collections</p>
                  <p className="font-semibold">{user.collectionCount}</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      }
    </>
    
    
  );
}