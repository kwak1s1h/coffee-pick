export type Screen = 'main' | 'filter' | 'brand' | 'result';

export type DrinkType = 'all' | 'decaf' | 'smoothie' | 'drink';

export type BrandKey =
  | 'starbucks'
  | 'ediya'
  | 'twosome'
  | 'mega'
  | 'compose'
  | 'paikdabang'
  | 'hollys';

export interface MenuItem {
  name: string;
  brand: BrandKey;
  brandLabel: string;
  price: number;
  type: 'drink' | 'decaf' | 'smoothie';
  desc: string;
  tags: string[];
}

export interface Brand {
  key: BrandKey;
  label: string;
  color: string;
}

export interface DrinkOption {
  key: DrinkType;
  label: string;
}

export interface PriceOption {
  key: string;
  label: string;
  value: number | null;
}

export type BrandSelection = Record<BrandKey, boolean>;

export interface CoffeePickState {
  screen: Screen;
  drinkType: DrinkType;
  priceLimit: number | null;
  brands: BrandSelection;
  pickedItem: MenuItem | null;
  noResult: boolean;
}
