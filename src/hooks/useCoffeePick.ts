import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchBrands } from '../api/brands';
import { fetchMenu } from '../api/menu';
import { BRAND_COLORS, BRAND_LIST, DEFAULT_BRAND_COLOR, MENU } from '../data/menu';
import { filterExplore } from '../utils/explore';
import type { AppState, Brand, BrandKey, DrinkType, ExploreView, MenuItem } from '../types';

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
  const [menu, setMenu] = useState<MenuItem[]>(MENU);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>(BRAND_LIST);

  useEffect(() => {
    let cancelled = false;

    fetchMenu()
      .then((items) => {
        if (cancelled) return;
        if (items.length > 0) {
          setMenu(items);
        } else {
          setMenuError('아직 등록된 메뉴가 없습니다.');
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setMenuError(err instanceof Error ? err.message : '메뉴 서버에 연결하지 못했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setMenuLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    // color는 API에 없는 UI 전용 값이라 로컬 BRAND_COLORS에서 붙인다. 실패하면
    // 조용히 BRAND_LIST(초기값) 그대로 둔다 — 메뉴 쪽 menuError 배너가 이미
    // 같은 근본 원인(API 연결 실패)을 알려주므로 별도 에러 상태를 두지 않는다.
    fetchBrands()
      .then((items) => {
        if (cancelled || items.length === 0) return;
        setBrands(
          items.map((b) => ({ ...b, color: BRAND_COLORS[b.key] ?? DEFAULT_BRAND_COLOR })),
        );
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

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
      const pool = menu.filter(
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
  }, [menu]);

  const exploreItems = useMemo(
    () => filterExplore(menu, state.exploreTypeFilter, state.exploreQuery),
    [menu, state.exploreTypeFilter, state.exploreQuery],
  );

  return {
    state,
    menu,
    menuLoading,
    menuError,
    brands,
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
