import { BottomNav } from '../components/BottomNav';
import { BrandRow } from '../components/BrandRow';
import { IconButton } from '../components/IconButton';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { BRAND_LIST } from '../data/menu';
import type { Screen } from '../types';
import type { useCoffeePick } from '../hooks/useCoffeePick';
import styles from './BrandScreen.module.css';

type CoffeePick = ReturnType<typeof useCoffeePick>;

interface BrandScreenProps {
  pick: CoffeePick;
  onNavigate: (screen: Screen) => void;
}

export function BrandScreen({ pick, onNavigate }: BrandScreenProps) {
  const { state, goMain, toggleBrand, toggleAllBrands } = pick;
  const allOn = BRAND_LIST.every((b) => state.brands[b.key]);

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <IconButton onClick={goMain} ariaLabel="뒤로 가기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.2}>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </IconButton>
        <div className={styles.title}>브랜드 뽑기함</div>
      </div>
      <div className={styles.subtitle}>뽑고 싶은 브랜드만 콕콕 골라보세요!</div>

      <div className={styles.allRow}>
        <span
          className={styles.allLabel}
          style={{ color: allOn ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
        >
          전체 선택
        </span>
        <ToggleSwitch on={allOn} onChange={toggleAllBrands} ariaLabel="전체 선택 토글" />
      </div>

      <div className={styles.list}>
        {BRAND_LIST.map((brand) => (
          <BrandRow
            key={brand.key}
            brand={brand}
            enabled={state.brands[brand.key]}
            onToggle={() => toggleBrand(brand.key)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.saveButton} onClick={goMain}>
          저장!
        </button>
      </div>

      <BottomNav active="brand" onNavigate={onNavigate} />
    </div>
  );
}
