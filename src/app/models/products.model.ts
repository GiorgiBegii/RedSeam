// Interface for a single product
export interface Product {
  id: number;
  name: string;
  release_year: string;
  image: string;
  price: number;
}

// Interface for pagination links
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string;
  next: string;
}

// Interface for pagination metadata
export interface PaginationMeta {
  current_page: number;
  current_page_url: string;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

// Interface for the full paginated product response
export interface ProductResponse {
  data: Product[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[];
  brand: {
    id: number;
    name: string;
    image: string;
  };
  total_price: number;
  quantity: number;
  color: string;
  size: string;
}
