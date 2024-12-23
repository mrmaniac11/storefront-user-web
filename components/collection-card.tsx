import { Card, CardContent, CardFooter } from "./ui/card";
import { Collection } from "@/lib/types";
import Image from "next/image";
import { Package } from "lucide-react";
import { useRouter } from 'next/navigation'

export function CollectionCard({ userName, collection }: { userName: string, collection: Collection }) {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/${userName}/collections/${collection.id}`);
  };


  return (
    <Card className="overflow-hidden cursor-pointer" onClick={handleClick}>
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="font-semibold">{collection.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {collection.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>{collection.productCount} products</span>
        </div>
      </CardFooter>
    </Card>
  );
}