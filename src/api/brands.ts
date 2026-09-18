import type { Brand } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export async function fetchBrands(): Promise<Pick<Brand, 'key' | 'label'>[]> {
  const response = await fetch(`${API_BASE_URL}/brands`);
  if (!response.ok) {
    throw new Error(`브랜드 목록을 불러오지 못했습니다 (status: ${response.status})`);
  }
  return response.json();
}
