import { useCallback, useMemo, useState } from 'react';
import { MENU } from '../data/menu';
import { filterExplore } from '../utils/explore';
import type { AppState, BrandKey, DrinkType, ExploreView } from '../types';

const INITIAL_STATE: AppState = {
  screen: 'draw',
  filterOpen: false,
  exploreFilterOpen: false,
  drinkType: 'decaf',
  priceLimit: 5000,
  selectedBrand: 'all',
  exploreTypeFilter: 'all',
  exploreQuery: '',
  exploreView: 'list',
  pickedItem: null,
  noResult: false,
  darkMode: false,
};

export function useCoffeePick() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const goDraw = useCallback(() => setState((s) => ({ ...s, screen: 'draw' })), []);
  const goExplore = useCallback(() => setState((s) => ({ ...s, screen: 'explore' })), []);
  const goSettings = useCallback(() => setState((s) => ({ ...s, screen: 'settings' })), []);

  const openFilter = useCallback(() => setState((s) => ({ ...s, filterOpen: true })), []);
  const closeFilter = useCallback(() => setState((s) => ({ ...s, filterOpen: false })), []);
  const resetFilter = useCallback(
    () => setState((s) => ({ ...s, drinkType: 'all', priceLimit: null })),
    [],
  );

  const openExploreFilter = useCallback(
    () => setState((s) => ({ ...s, exploreFilterOpen: true })),
    [],
  );
  const closeExploreFilter = useCallback(
    () => setState((s) => ({ ...s, exploreFilterOpen: false })),
    [],
  );
  const resetExploreFilter = useCallback(
    () => setState((s) => ({ ...s, exploreTypeFilter: 'all' })),
    [],
  );

  const setDrinkType = useCallback((v: DrinkType) => setState((s) => ({ ...s, drinkType: v })), []);
  const setPriceLimit = useCallback(
    (v: number | null) => setState((s) => ({ ...s, priceLimit: v })),
    [],
  );
  const setSelectedBrand = useCallback(
    (v: BrandKey | 'all') => setState((s) => ({ ...s, selectedBrand: v })),
    [],
  );

  const setExploreView = useCallback(
    (v: ExploreView) => setState((s) => ({ ...s, exploreView: v })),
    [],
  );
  const setExploreQuery = useCallback(
    (v: string) => setState((s) => ({ ...s, exploreQuery: v })),
    [],
  );
  const setExploreTypeFilter = useCallback(
    (v: DrinkType) => setState((s) => ({ ...s, exploreTypeFilter: v })),
    [],
  );

  const toggleDarkMode = useCallback(() => setState((s) => ({ ...s, darkMode: !s.darkMode })), []);

  const draw = useCallback(() => {
    setState((s) => {
      const pool = MENU.filter(
        (item) =>
          (s.drinkType === 'all' || item.type === s.drinkType) &&
          (s.priceLimit === null || item.price <= s.priceLimit) &&
          (s.selectedBrand === 'all' || item.brand === s.selectedBrand),
      );
      if (pool.length === 0) {
        return { ...s, pickedItem: null, noResult: true, screen: 'result' };
      }
      const picked = pool[Math.floor(Math.random() * pool.length)];
      return { ...s, pickedItem: picked, noResult: false, screen: 'result' };
    });
  }, []);

  const exploreItems = useMemo(
    () => filterExplore(MENU, state.exploreTypeFilter, state.exploreQuery),
    [state.exploreTypeFilter, state.exploreQuery],
  );

  return {
    state,
    exploreItems,
    goDraw,
    goExplore,
    goSettings,
    openFilter,
    closeFilter,
    resetFilter,
    openExploreFilter,
    closeExploreFilter,
    resetExploreFilter,
    setDrinkType,
    setPriceLimit,
    setSelectedBrand,
    setExploreView,
    setExploreQuery,
    setExploreTypeFilter,
    toggleDarkMode,
    draw,
  };
}
