// const BASE_URL = 'https://jubilant-yodel-g7j7q7j6qxfvjrp-8000.app.github.dev/api/v1'; 
const BASE_URL = 'http://localhost:8000/api/v1';

export type Product = {
  id: string
  name: string
  colour: string
  quantity: number
  image: string
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

// export async function createPost(post: Omit<Post, 'id'>) {
//   const response = await fetch(`${BASE_URL}/posts`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(post),
//   });
//   if (!response.ok) throw new Error('Failed to create post');
//   return response.json();
// }


export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to create post');

  return response.json();
}