import { BRAND_LIST, DRINK_OPTIONS, PRICE_OPTIONS } from '../data/menu';
import type { CoffeePickState } from '../types';

export function summaryText(state: CoffeePickState): string {
  const drinkLabel = DRINK_OPTIONS.find((o) => o.key === state.drinkType)?.label ?? '전체';
  const priceLabel = PRICE_OPTIONS.find((o) => o.value === state.priceLimit)?.label ?? '제한 없음';
  const brandCount = BRAND_LIST.filter((b) => state.brands[b.key]).length;
  return `${drinkLabel} · ${priceLabel} · 브랜드 ${brandCount}곳`;
}
