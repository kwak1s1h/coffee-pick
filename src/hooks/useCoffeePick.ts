import { useCallback, useState } from 'react';
import { BRAND_LIST, MENU } from '../data/menu';
import type { BrandKey, CoffeePickState, DrinkType } from '../types';

const INITIAL_STATE: CoffeePickState = {
  screen: 'main',
  drinkType: 'decaf',
  priceLimit: 5000,
  brands: {
    starbucks: true,
    ediya: true,
    twosome: true,
    mega: false,
    compose: false,
    paikdabang: false,
    hollys: false,
  },
  pickedItem: null,
  noResult: false,
};

export function useCoffeePick() {
  const [state, setState] = useState<CoffeePickState>(INITIAL_STATE);

  const goMain = useCallback(() => setState((s) => ({ ...s, screen: 'main' })), []);
  const goFilter = useCallback(() => setState((s) => ({ ...s, screen: 'filter' })), []);
  const goBrand = useCallback(() => setState((s) => ({ ...s, screen: 'brand' })), []);

  const setDrinkType = useCallback((v: DrinkType) => {
    setState((s) => ({ ...s, drinkType: v }));
  }, []);

  const setPriceLimit = useCallback((v: number | null) => {
    setState((s) => ({ ...s, priceLimit: v }));
  }, []);

  const toggleBrand = useCallback((key: BrandKey) => {
    setState((s) => ({ ...s, brands: { ...s.brands, [key]: !s.brands[key] } }));
  }, []);

  const toggleAllBrands = useCallback(() => {
    setState((s) => {
      const allOn = BRAND_LIST.every((b) => s.brands[b.key]);
      const next = { ...s.brands };
      BRAND_LIST.forEach((b) => {
        next[b.key] = !allOn;
      });
      return { ...s, brands: next };
    });
  }, []);

  const draw = useCallback(() => {
    setState((s) => {
      const pool = MENU.filter(
        (item) =>
          (s.drinkType === 'all' || item.type === s.drinkType) &&
          (s.priceLimit === null || item.price <= s.priceLimit) &&
          s.brands[item.brand],
      );
      if (pool.length === 0) {
        return { ...s, pickedItem: null, noResult: true, screen: 'result' };
      }
      const picked = pool[Math.floor(Math.random() * pool.length)];
      return { ...s, pickedItem: picked, noResult: false, screen: 'result' };
    });
  }, []);

  return {
    state,
    goMain,
    goFilter,
    goBrand,
    setDrinkType,
    setPriceLimit,
    toggleBrand,
    toggleAllBrands,
    draw,
  };
}
