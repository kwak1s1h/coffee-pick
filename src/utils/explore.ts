import type { DrinkType, MenuItem } from '../types';

export function filterExplore(menu: MenuItem[], typeFilter: DrinkType, query: string): MenuItem[] {
  const q = query.trim().toLowerCase();
  return menu.filter(
    (m) =>
      (typeFilter === 'all' || m.type === typeFilter) &&
      (!q || m.name.toLowerCase().includes(q) || m.brandLabel.toLowerCase().includes(q)),
  );
}
