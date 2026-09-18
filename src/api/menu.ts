import type { MenuItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export async function fetchMenu(): Promise<MenuItem[]> {
  const response = await fetch(`${API_BASE_URL}/menu`);
  if (!response.ok) {
    throw new Error(`메뉴를 불러오지 못했습니다 (status: ${response.status})`);
  }
  return response.json();
}
