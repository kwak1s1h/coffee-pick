import { BottomNav } from '../components/BottomNav';
import { ToggleSwitch } from '../components/ToggleSwitch';
import type { useCoffeePick } from '../hooks/useCoffeePick';
import type { Screen } from '../types';
import styles from './SettingsScreen.module.css';

type CoffeePick = ReturnType<typeof useCoffeePick>;

interface SettingsScreenProps {
  pick: CoffeePick;
  onNavigate: (screen: Screen) => void;
}

export function SettingsScreen({ pick, onNavigate }: SettingsScreenProps) {
  const { state, toggleDarkMode } = pick;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.title}>설정 ⚙️</div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionLabel}>테마</div>
          <div className={styles.themeCard}>
            <span className={styles.themeLabel}>
              {state.darkMode ? '다크 모드 켜짐' : '다크 모드 꺼짐'}
            </span>
            <ToggleSwitch on={state.darkMode} onChange={toggleDarkMode} ariaLabel="다크 모드 전환" />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>앱 정보</div>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.infoRowLabel}>버전</span>
              <span className={styles.infoRowValue}>1.0.0</span>
            </div>
            <div className={styles.infoDesc}>
              <span>오늘 마실 커피 고민, 커피 픽에게 맡기고 즐거운 한 잔의 우연을 만나보세요 ☕️</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active={state.screen} onNavigate={onNavigate} />
    </div>
  );
}
