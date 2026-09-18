import type { Screen } from '../types';
import styles from './BottomNav.module.css';

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      <button
        type="button"
        className={styles.item}
        style={{ color: active === 'explore' ? '#FFFFFF' : 'var(--color-nav-inactive)' }}
        onClick={() => onNavigate('explore')}
      >
        <div
          className={styles.dot}
          style={{ background: active === 'explore' ? 'var(--color-accent-coral)' : 'transparent' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>
        <span>탐색</span>
      </button>

      <button
        type="button"
        className={styles.fab}
        aria-label="뽑기 탭으로 이동"
        onClick={() => onNavigate('draw')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.8}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="8" cy="8" r="1.3" fill="#FFFFFF" stroke="none" />
          <circle cx="16" cy="8" r="1.3" fill="#FFFFFF" stroke="none" />
          <circle cx="12" cy="12" r="1.3" fill="#FFFFFF" stroke="none" />
          <circle cx="8" cy="16" r="1.3" fill="#FFFFFF" stroke="none" />
          <circle cx="16" cy="16" r="1.3" fill="#FFFFFF" stroke="none" />
        </svg>
      </button>

      <button
        type="button"
        className={styles.item}
        style={{ color: active === 'settings' ? '#FFFFFF' : 'var(--color-nav-inactive)' }}
        onClick={() => onNavigate('settings')}
      >
        <div
          className={styles.dot}
          style={{ background: active === 'settings' ? 'var(--color-accent-coral)' : 'transparent' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </div>
        <span>설정</span>
      </button>
    </nav>
  );
}
