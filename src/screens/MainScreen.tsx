import { BottomNav } from '../components/BottomNav';
import type { Screen } from '../types';
import { summaryText } from '../utils/summary';
import type { useCoffeePick } from '../hooks/useCoffeePick';
import styles from './MainScreen.module.css';

type CoffeePick = ReturnType<typeof useCoffeePick>;

interface MainScreenProps {
  pick: CoffeePick;
  onNavigate: (screen: Screen) => void;
}

export function MainScreen({ pick, onNavigate }: MainScreenProps) {
  const { state, draw } = pick;

  return (
    <div className={styles.screen}>
      <div className={styles.dotYellow} />
      <div className={styles.dotMint} />
      <div className={styles.dotPurple} />

      <div className={styles.header}>
        <div className={styles.logo}>커피 픽 🎲</div>
        <div className={styles.tagline}>두근두근, 오늘의 커피는 뭘까?</div>
      </div>

      <div className={styles.body}>
        <div className={styles.capsule}>
          <div className={styles.capsuleTop}>
            <span>?</span>
          </div>
          <div className={styles.capsuleBottom} />
        </div>
        <button type="button" className={styles.drawButton} onClick={draw}>
          뽑기!
        </button>
      </div>

      <div className={styles.summary}>
        <span>{summaryText(state)}</span>
      </div>

      <BottomNav active="main" onNavigate={onNavigate} />
    </div>
  );
}
