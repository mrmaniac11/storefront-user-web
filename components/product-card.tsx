import { useState } from 'react';
import { Card, CardContent, CardFooter } from "./ui/card";
import { Product } from "@/lib/types";
import Image from "next/image";
import { createPortal } from 'react-dom';

export function ProductCard({ userName, product }: { userName: string, product: Product }) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleClick = () => {
    setIsEnlarged(true);
  };

  const handleClose = () => {
    setIsEnlarged(false);
  };

  return (
    <>
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

      {isEnlarged && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
          <div className="relative z-60 w-11/12 max-w-3xl p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300 scale-110" onClick={(e) => e.stopPropagation()}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 w-full">
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
          </div>
        </div>,
        document.body
      )}
    </>
  );
}