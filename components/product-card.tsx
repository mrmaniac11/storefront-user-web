import { useState } from 'react';
import { Card, CardContent, CardFooter } from "./ui/card";
import { Product } from "@/lib/types";
import Image from "next/image";
import { createPortal } from 'react-dom';

export function ProductCard({
  userName,
  product,
  index,
  currentEnlargedProduct,
  setCurrentEnlargedProduct,
  hasPrevProduct,
  hasNextProduct,
  handleProductNavigation,
  currentEnlargedProductIndex,
  setCurrentEnlargedProductIndex
}: {
  userName: string;
  product: Product;
  index: number;
  currentEnlargedProduct: Product | null;
  setCurrentEnlargedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setCurrentEnlargedProductIndex: React.Dispatch<React.SetStateAction<number>>;
  handleProductNavigation: (index: number, direction: 'next' | 'prev') => void;
  currentEnlargedProductIndex
}) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);

  const handleClick = () => {
    setIsAnimating(true);
    setIsEnlarged(true);
    setCurrentEnlargedProduct(product);
    setCurrentEnlargedProductIndex(index);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setIsEnlarged(false);
    setCurrentEnlargedProduct(null);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  const handleNext = () => {
    handleProductNavigation(currentEnlargedProductIndex, 'next');
  };

  const handlePrev = () => {
    handleProductNavigation(currentEnlargedProductIndex, 'prev')
  };

  return (
    <>
      <Card className="overflow-hidden cursor-pointer" onClick={handleClick}>
        <CardContent className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="font-semibold">{currentProduct.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {currentProduct.description}
          </p>
          <p className="font-bold">${currentProduct?.price?.toFixed(2)}</p>
        </CardFooter>
      </Card>

      {isEnlarged && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
          <div
            className={`relative z-60 w-11/12 max-w-3xl p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-600 ${isAnimating ? (isEnlarged ? 'enlarge' : 'shrink') : ''}`}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={handleAnimationEnd}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 w-full">
                  <Image
                    src={currentEnlargedProduct.image}
                    alt={currentEnlargedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 p-4">
                <h3 className="font-semibold">{currentEnlargedProduct.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {currentEnlargedProduct.description}
                </p>
                <p className="font-bold">${currentEnlargedProduct?.price?.toFixed(2)}</p>
              </CardFooter>
            </Card>
            <div className="flex justify-between mt-4">
              {hasPrevProduct ? (
                <button onClick={handlePrev} className="p-2 bg-gray-200 rounded-full px-5">
                  Prev
                </button>
              ) : <span></span>}
              {hasNextProduct ? (
                <button onClick={handleNext} className="p-2 bg-gray-200 rounded-full px-5">
                  Next
                </button>
              ) : <span></span>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}