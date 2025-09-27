interface Brand {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  release_date: string; // ISO 8601 date string
  cover_image: string;
  images: string[];
  price: number;
  total_price: number;
  quantity: number;
  brand: Brand;
}
