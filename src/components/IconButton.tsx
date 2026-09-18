import type { ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps {
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
}

export function IconButton({ onClick, ariaLabel, children }: IconButtonProps) {
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={styles.button}>
      {children}
    </button>
  );
}
