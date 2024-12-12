import { Product, Collection } from './types';

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
];

export function generateMockProducts(page: number, limit: number): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = Array.from({ length: limit }, (_, i) => ({
        id: `product-${Date.now()}-${page}-${i}`,
        name: `Product ${page * limit + i + 1}`,
        description: 'A high-quality product with amazing features and premium materials.',
        price: Math.floor(Math.random() * 900) + 100,
        image: `${PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}?w=600&fit=crop`,
      }));
      resolve(products);
    }, 800);
  });
}

const COLLECTION_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
];

export function generateMockCollections(page: number, limit: number): Promise<Collection[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const collections = Array.from({ length: limit }, (_, i) => ({
        id: `collection-${Date.now()}-${page}-${i}`,
        name: `Collection ${page * limit + i + 1}`,
        description: 'A carefully curated collection of premium products.',
        image: `${COLLECTION_IMAGES[i % COLLECTION_IMAGES.length]}?w=600&fit=crop`,
        productCount: Math.floor(Math.random() * 50) + 10,
      }));
      resolve(collections);
    }, 800);
  });
}