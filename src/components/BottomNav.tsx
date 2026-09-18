import type { ReactElement } from 'react';
import type { Screen } from '../types';
import styles from './BottomNav.module.css';

interface NavItemDef {
  screen: Screen;
  label: string;
  icon: ReactElement;
}

const ITEMS: NavItemDef[] = [
  {
    screen: 'main',
    label: '뽑기',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="8" cy="16" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    screen: 'filter',
    label: '필터',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5Z" />
      </svg>
    ),
  },
  {
    screen: 'brand',
    label: '브랜드',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M4 9V5h16v4" />
        <path d="M3 9h18l-1 3H4L3 9Z" />
        <path d="M5 12v7h14v-7" />
        <path d="M9 19v-4h6v4" />
      </svg>
    ),
  },
];

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      {ITEMS.map((item) => {
        const isActive = active === item.screen;
        return (
          <button
            key={item.screen}
            type="button"
            className={styles.item}
            style={{ color: isActive ? '#FFFFFF' : 'var(--color-nav-inactive)' }}
            onClick={() => onNavigate(item.screen)}
          >
            <div
              className={styles.dot}
              style={{ background: isActive ? 'var(--color-accent-coral)' : 'transparent' }}
            >
              {item.icon}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
