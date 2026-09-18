import type { ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps {
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
  size?: number;
}

export function IconButton({ onClick, ariaLabel, children, size = 40 }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={styles.button}
      style={{ width: size, height: size }}
    >
      {children}
    </button>
  );
}
