const BASE_URL = 'https://jubilant-yodel-g7j7q7j6qxfvjrp-8000.app.github.dev/api/v1'; 
// const BASE_URL = 'http://localhost:8000/api/v1';

export type Product = {
  id: string
  colour: string
  quantity: number
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(
    // `${BASE_URL}/product?_page=${page}&_limit=${limit}`
    `${BASE_URL}/product`
  );
  if (!response.ok) throw new Error('Failed to fetch products');

  return await response.json() || [];
}

export async function fetchProduct(productId: string) {
  const response = await fetch(
    `${BASE_URL}/product/${productId}`
  );
  if (!response.ok) throw new Error('Failed to fetch product');

  return {
    product: await response.json(),
  };
}

export async function createProduct(product: Omit<Product, 'id'>) {
  const response = await fetch(`${BASE_URL}/product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to create product');

  return response.json();
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to create product');

  return response.json();
}