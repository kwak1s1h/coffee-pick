import { BottomNav } from '../components/BottomNav';
import { FilterChip } from '../components/FilterChip';
import { IconButton } from '../components/IconButton';
import { DRINK_OPTIONS, PRICE_OPTIONS } from '../data/menu';
import type { Screen } from '../types';
import type { useCoffeePick } from '../hooks/useCoffeePick';
import styles from './FilterScreen.module.css';

type CoffeePick = ReturnType<typeof useCoffeePick>;

interface FilterScreenProps {
  pick: CoffeePick;
  onNavigate: (screen: Screen) => void;
}

export function FilterScreen({ pick, onNavigate }: FilterScreenProps) {
  const { state, goMain, setDrinkType, setPriceLimit } = pick;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <IconButton onClick={goMain} ariaLabel="뒤로 가기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.2}>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </IconButton>
        <div className={styles.title}>필터 설정</div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>음료 종류는?</div>
        <div className={styles.grid} role="radiogroup" aria-label="음료 종류">
          {DRINK_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.key}
              label={opt.label}
              selected={state.drinkType === opt.key}
              accentColor="var(--color-accent-coral)"
              onClick={() => setDrinkType(opt.key)}
            />
          ))}
        </div>
      </div>

      <div className={styles.sectionLast}>
        <div className={styles.sectionLabel}>가격은 얼마까지?</div>
        <div className={styles.grid} role="radiogroup" aria-label="가격 상한">
          {PRICE_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.key}
              label={opt.label}
              selected={state.priceLimit === opt.value}
              accentColor="var(--color-accent-mint)"
              onClick={() => setPriceLimit(opt.value)}
            />
          ))}
        </div>
      </div>

      <div className={styles.spacer} />

      <div className={styles.footer}>
        <button type="button" className={styles.saveButton} onClick={goMain}>
          필터 저장!
        </button>
      </div>

      <BottomNav active="filter" onNavigate={onNavigate} />
    </div>
  );
}
