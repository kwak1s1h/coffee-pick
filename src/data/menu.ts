import type { Brand, BrandKey, DrinkOption, MenuItem, PriceOption } from '../types';

export const MENU: MenuItem[] = [
  { name: '아메리카노', brand: 'starbucks', brandLabel: '스타벅스', price: 4500, type: 'drink', desc: '깔끔하고 진한 에스프레소 베이스의 기본 커피.', tags: ['카페인'] },
  { name: '카페라떼', brand: 'starbucks', brandLabel: '스타벅스', price: 5000, type: 'drink', desc: '부드러운 우유와 진한 에스프레소가 만나 균형 잡힌 한 잔.', tags: ['카페인', '우유 포함'] },
  { name: '디카페인 아메리카노', brand: 'starbucks', brandLabel: '스타벅스', price: 4800, type: 'decaf', desc: '카페인 부담 없이 즐기는 산뜻한 아메리카노.', tags: ['디카페인'] },
  { name: '바닐라라떼', brand: 'ediya', brandLabel: '이디야커피', price: 4200, type: 'drink', desc: '달콤한 바닐라 시럽이 더해진 부드러운 라떼.', tags: ['카페인', '우유 포함'] },
  { name: '콜드브루', brand: 'ediya', brandLabel: '이디야커피', price: 3800, type: 'drink', desc: '저온으로 오래 우려낸 깊고 시원한 커피.', tags: ['카페인'] },
  { name: '디카페인 카페라떼', brand: 'twosome', brandLabel: '투썸플레이스', price: 5500, type: 'decaf', desc: '카페인 걱정 없이 즐기는 부드러운 라떼.', tags: ['디카페인', '우유 포함'] },
  { name: '자몽 스무디', brand: 'twosome', brandLabel: '투썸플레이스', price: 6200, type: 'smoothie', desc: '상큼한 자몽 과육이 가득한 시원한 스무디.', tags: ['논카페인'] },
  { name: '딸기 스무디', brand: 'mega', brandLabel: '메가커피', price: 3900, type: 'smoothie', desc: '달콤한 딸기 과즙이 듬뿍 담긴 스무디.', tags: ['논카페인'] },
  { name: '카푸치노', brand: 'mega', brandLabel: '메가커피', price: 3500, type: 'drink', desc: '풍성한 우유 거품이 매력적인 진한 커피.', tags: ['카페인', '우유 포함'] },
  { name: '카라멜 마키아토', brand: 'compose', brandLabel: '컴포즈커피', price: 3800, type: 'drink', desc: '달콤 쌉싸름한 카라멜과 에스프레소의 조화.', tags: ['카페인', '우유 포함'] },
  { name: '디카페인 바닐라라떼', brand: 'paikdabang', brandLabel: '빽다방', price: 4000, type: 'decaf', desc: '카페인 없이 즐기는 달콤한 바닐라라떼.', tags: ['디카페인', '우유 포함'] },
  { name: '에스프레소', brand: 'hollys', brandLabel: '할리스', price: 3200, type: 'drink', desc: '깊고 진한 풍미의 순수한 에스프레소 샷.', tags: ['카페인'] },
];

/**
 * `useCoffeePick`이 GET /brands를 부르기 전까지 쓰는 초기값이자, 실패했을 때
 * 폴백으로 남는 값이다(`MENU`가 `fetchMenu` 앞에서 하는 역할과 동일). label은
 * API가 내려주는 값으로 갱신되지만, API에는 없는 UI 전용 값인 color는 아래
 * BRAND_COLORS에서 항상 이 배열 기준으로 붙는다.
 */
export const BRAND_LIST: Brand[] = [
  { key: 'starbucks', label: '스타벅스', color: '#1FAE79' },
  { key: 'ediya', label: '이디야커피', color: '#E8483F' },
  { key: 'twosome', label: '투썸플레이스', color: '#E8A62E' },
  { key: 'mega', label: '메가커피', color: '#5B4BC4' },
  { key: 'compose', label: '컴포즈커피', color: '#2B2140' },
  { key: 'paikdabang', label: '빽다방', color: '#B8352E' },
  { key: 'hollys', label: '할리스', color: '#1B6FA8' },
];

export const DEFAULT_BRAND_COLOR = '#2B2140';

export const BRAND_COLORS: Partial<Record<BrandKey, string>> = Object.fromEntries(
  BRAND_LIST.map((b) => [b.key, b.color]),
);

export const DRINK_OPTIONS: DrinkOption[] = [
  { key: 'all', label: '전체' },
  { key: 'decaf', label: '디카페인만' },
  { key: 'smoothie', label: '스무디만' },
  { key: 'drink', label: '음료만' },
];

export const PRICE_OPTIONS: PriceOption[] = [
  { key: 'none', label: '제한 없음', value: null },
  { key: 'p3000', label: '3,000원 이하', value: 3000 },
  { key: 'p5000', label: '5,000원 이하', value: 5000 },
  { key: 'p7000', label: '7,000원 이하', value: 7000 },
];

export const TYPE_LABEL: Record<MenuItem['type'], string> = {
  drink: '음료',
  decaf: '디카페인',
  smoothie: '스무디',
};

export const TYPE_BG: Record<MenuItem['type'], string> = {
  drink: '#FFC93C',
  decaf: '#3DDC97',
  smoothie: '#7C6CF6',
};
