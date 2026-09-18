import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
  on: boolean;
  onChange: () => void;
  ariaLabel: string;
}

export function ToggleSwitch({ on, onChange, ariaLabel }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={ariaLabel}
      role="switch"
      aria-checked={on}
      className={styles.track}
      style={{ background: on ? 'var(--color-accent-mint)' : 'var(--color-switch-off)' }}
    >
      <span className={styles.thumb} style={{ left: on ? 21 : 3 }} />
    </button>
  );
}
