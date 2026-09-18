import { BRAND_LIST, DRINK_OPTIONS, PRICE_OPTIONS } from '../data/menu';
import type { AppState } from '../types';

export function summaryText(state: AppState): string {
  const brandLabel = BRAND_LIST.find((b) => b.key === state.selectedBrand)?.label ?? '전체 브랜드';
  const drinkLabel = DRINK_OPTIONS.find((o) => o.key === state.drinkType)?.label ?? '전체';
  const priceLabel = PRICE_OPTIONS.find((o) => o.value === state.priceLimit)?.label ?? '제한 없음';
  return `${brandLabel} · ${drinkLabel} · ${priceLabel}`;
}

export function activeFilterCount(state: AppState): number {
  return (state.drinkType !== 'all' ? 1 : 0) + (state.priceLimit !== null ? 1 : 0);
}
