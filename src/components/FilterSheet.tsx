import { FilterChip } from './FilterChip';
import { IconButton } from './IconButton';
import styles from './FilterSheet.module.css';

export interface FilterSheetOption {
  key: string;
  label: string;
  selected: boolean;
  accentColor: string;
  onSelect: () => void;
}

export interface FilterSheetSection {
  label: string;
  ariaLabel: string;
  options: FilterSheetOption[];
}

interface FilterSheetProps {
  title: string;
  maxHeight: string;
  sections: FilterSheetSection[];
  onClose: () => void;
  onReset: () => void;
}

export function FilterSheet({ title, maxHeight, sections, onClose, onReset }: FilterSheetProps) {
  return (
    <>
      <button type="button" onClick={onClose} aria-label="필터 닫기" className={styles.backdrop} />
      <div className={styles.sheet} style={{ maxHeight }}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <IconButton onClick={onClose} ariaLabel="필터 닫기" size={34}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.2}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </IconButton>
        </div>

        <div className={styles.body}>
          {sections.map((section) => (
            <div key={section.label} className={styles.section}>
              <div className={styles.sectionLabel}>{section.label}</div>
              <div className={styles.grid} role="radiogroup" aria-label={section.ariaLabel}>
                {section.options.map((opt) => (
                  <FilterChip
                    key={opt.key}
                    label={opt.label}
                    selected={opt.selected}
                    accentColor={opt.accentColor}
                    onClick={opt.onSelect}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.resetButton} onClick={onReset}>
            초기화
          </button>
          <button type="button" className={styles.applyButton} onClick={onClose}>
            필터 적용!
          </button>
        </div>
      </div>
    </>
  );
}
