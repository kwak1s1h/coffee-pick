import { BottomNav } from '../components/BottomNav';
import { FilterSheet } from '../components/FilterSheet';
import { BRAND_LIST, DRINK_OPTIONS, PRICE_OPTIONS } from '../data/menu';
import { activeFilterCount, summaryText } from '../utils/summary';
import type { useCoffeePick } from '../hooks/useCoffeePick';
import type { Screen } from '../types';
import styles from './DrawScreen.module.css';

type CoffeePick = ReturnType<typeof useCoffeePick>;

interface DrawScreenProps {
  pick: CoffeePick;
  onNavigate: (screen: Screen) => void;
}

export function DrawScreen({ pick, onNavigate }: DrawScreenProps) {
  const {
    state,
    draw,
    openFilter,
    closeFilter,
    resetFilter,
    setDrinkType,
    setPriceLimit,
    setSelectedBrand,
  } = pick;

  const filterCount = activeFilterCount(state);

  return (
    <div className={styles.screen}>
      <div className={styles.dotYellow} />
      <div className={styles.dotMint} />
      <div className={styles.dotPurple} />

      <div className={styles.header}>
        <div className={styles.logo}>커피 Pick 🎲</div>
        <div className={styles.tagline}>두근두근, 오늘의 커피는 뭘까?</div>
      </div>

      <div className={styles.body}>
        <div className={styles.capsule}>
          <div className={styles.capsuleTop} />
          <div className={styles.capsuleBottom} />
          <span className={styles.capsuleQuestion}>?</span>
        </div>

        <div className={styles.controls}>
          <label className={styles.brandLabel}>
            <span>브랜드</span>
            <div className={styles.selectWrap}>
              <select
                className={styles.select}
                value={state.selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value as typeof state.selectedBrand)}
              >
                <option value="all">전체 브랜드</option>
                {BRAND_LIST.map((b) => (
                  <option key={b.key} value={b.key}>
                    {b.label}
                  </option>
                ))}
              </select>
              <svg
                className={styles.selectChevron}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text-primary)"
                strokeWidth={2.4}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </label>

          <button type="button" className={styles.filterButton} onClick={openFilter}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth={2}>
              <path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5Z" />
            </svg>
            고급 필터
            {filterCount > 0 && <span className={styles.filterBadge}>{filterCount}</span>}
          </button>
          <span className={styles.summary}>{summaryText(state)}</span>
        </div>

        <button type="button" className={styles.drawButton} onClick={draw}>
          뽑기!
        </button>
      </div>

      <BottomNav active={state.screen} onNavigate={onNavigate} />

      {state.filterOpen && (
        <FilterSheet
          title="고급 필터"
          maxHeight="78%"
          onClose={closeFilter}
          onReset={resetFilter}
          sections={[
            {
              label: '음료 종류는?',
              ariaLabel: '음료 종류',
              options: DRINK_OPTIONS.map((opt) => ({
                key: opt.key,
                label: opt.label,
                selected: state.drinkType === opt.key,
                accentColor: 'var(--color-accent-coral)',
                onSelect: () => setDrinkType(opt.key),
              })),
            },
            {
              label: '가격은 얼마까지?',
              ariaLabel: '가격 상한',
              options: PRICE_OPTIONS.map((opt) => ({
                key: opt.key,
                label: opt.label,
                selected: state.priceLimit === opt.value,
                accentColor: 'var(--color-accent-mint)',
                onSelect: () => setPriceLimit(opt.value),
              })),
            },
          ]}
        />
      )}
    </div>
  );
}
