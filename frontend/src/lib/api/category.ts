// const BASE_URL = 'https://jubilant-yodel-g7j7q7j6qxfvjrp-8000.app.github.dev/api/v1'; 
const BASE_URL = 'http://localhost:8000/api/v1';

export type Category = {
  id: number
  name: string
  description: string
  createdAt: Date
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    // `${BASE_URL}/product?_page=${page}&_limit=${limit}`
    `${BASE_URL}/category`
  );
  if (!response.ok) throw new Error('Failed to fetch categories');

  return await response.json() || [];
}

export async function fetchCategory(categoryId: number): Promise<{ product: Category }> {
  const response = await fetch(
    `${BASE_URL}/category/${categoryId}`
  );
  if (!response.ok) throw new Error('Failed to fetch category');

  return {
    product: await response.json(),
  };
}

export async function createCategory(category: Omit<Category, 'id' | 'createdAt'>) {
  const response = await fetch(`${BASE_URL}/category`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to create category');

  return response.json();
}

export async function updateCategory(id: string, category: Omit<Category, 'id'>): Promise<Category> {
  const response = await fetch(`${BASE_URL}/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to create category');

  return response.json();
}