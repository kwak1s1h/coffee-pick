import { useEffect } from 'react';
import { useCoffeePick } from './hooks/useCoffeePick';
import { DrawScreen } from './screens/DrawScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ResultScreen } from './screens/ResultScreen';
import type { Screen } from './types';
import styles from './App.module.css';

function App() {
  const pick = useCoffeePick();
  const { state, goDraw, goExplore, goSettings } = pick;

  useEffect(() => {
    document.documentElement.dataset.theme = state.darkMode ? 'dark' : 'light';
  }, [state.darkMode]);

  const onNavigate = (screen: Screen) => {
    if (screen === 'draw') goDraw();
    else if (screen === 'explore') goExplore();
    else if (screen === 'settings') goSettings();
  };

  return (
    <div className={styles.frame}>
      {state.screen === 'draw' && <DrawScreen pick={pick} onNavigate={onNavigate} />}
      {state.screen === 'explore' && <ExploreScreen pick={pick} onNavigate={onNavigate} />}
      {state.screen === 'settings' && <SettingsScreen pick={pick} onNavigate={onNavigate} />}
      {state.screen === 'result' && <ResultScreen pick={pick} />}
    </div>
  );
}

export default App;
