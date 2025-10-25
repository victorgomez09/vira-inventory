import { Category } from "./category";
import { API_URL } from './config';

export type Product = {
  id: number
  colour: string
  quantity: number
  category: Category
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/product`
  );
  if (!response.ok) throw new Error('Failed to fetch products');

  return await response.json() || [];
}

export async function fetchProduct(productId: number): Promise<{ product: Product }> {
  const response = await fetch(
    `${API_URL}/product/${productId}`
  );
  if (!response.ok) throw new Error('Failed to fetch product');

  return {
    product: await response.json(),
  };
}

export async function createProduct(product: Omit<Product, 'id' | 'category'> & { category_id: number }) {
  const response = await fetch(`${API_URL}/product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to create product');

  return response.json();
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to create product');

  return response.json();
}