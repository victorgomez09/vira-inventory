import { API_URL } from './config';

export type Category = {
  id: number
  name: string
  description: string
  createdAt: Date
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    `${API_URL}/category`
  );
  if (!response.ok) throw new Error('Failed to fetch categories');

  return await response.json() || [];
}

export async function fetchCategory(categoryId: number): Promise<{ product: Category }> {
  const response = await fetch(
    `${API_URL}/category/${categoryId}`
  );
  if (!response.ok) throw new Error('Failed to fetch category');

  return {
    product: await response.json(),
  };
}

export async function createCategory(category: Omit<Category, 'id' | 'createdAt'>) {
  const response = await fetch(`${API_URL}/category`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to create category');

  return response.json();
}

export async function updateCategory(id: string, category: Omit<Category, 'id'>): Promise<Category> {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to create category');

  return response.json();
}