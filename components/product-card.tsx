import { Card, CardContent, CardFooter } from "./ui/card";
import { Product } from "@/lib/types";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export function ProductCard({ userName, product }: { userName: string, product: Product }) {
  const router = useRouter();

  const handleClick = () => {
    console.log(product.id);
    router.push(`/${userName}/products/${product.id}`);
  };

  return (
    <Card className="overflow-hidden cursor-pointer" onClick={handleClick}>
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="font-bold">${product?.price?.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
}