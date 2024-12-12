export interface Product {
  id: string | null;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface User {
  name: string;
  productCount: number;
  collectionCount: number;
  avatar: string;
}