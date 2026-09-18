import type { Brand } from '../types';
import { ToggleSwitch } from './ToggleSwitch';
import styles from './BrandRow.module.css';

interface BrandRowProps {
  brand: Brand;
  enabled: boolean;
  onToggle: () => void;
}

export function BrandRow({ brand, enabled, onToggle }: BrandRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.avatar} style={{ background: brand.color }}>
        {brand.label.slice(0, 1)}
      </div>
      <span
        className={styles.label}
        style={{ color: enabled ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
      >
        {brand.label}
      </span>
      <ToggleSwitch on={enabled} onChange={onToggle} ariaLabel={`${brand.label} 토글`} />
    </div>
  );
}
