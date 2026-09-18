import styles from './FilterChip.module.css';

interface FilterChipProps {
  label: string;
  selected: boolean;
  accentColor: string;
  onClick: () => void;
}

export function FilterChip({ label, selected, accentColor, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={styles.chip}
      onClick={onClick}
      style={{
        background: selected ? accentColor : 'var(--color-white)',
        color: selected ? 'var(--color-white)' : 'var(--color-text-primary)',
        borderColor: selected ? accentColor : 'var(--color-text-primary)',
      }}
    >
      {label}
    </button>
  );
}
