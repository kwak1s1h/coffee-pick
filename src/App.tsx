import { useCoffeePick } from './hooks/useCoffeePick';
import { MainScreen } from './screens/MainScreen';
import { FilterScreen } from './screens/FilterScreen';
import { BrandScreen } from './screens/BrandScreen';
import { ResultScreen } from './screens/ResultScreen';
import type { Screen } from './types';
import styles from './App.module.css';

function App() {
  const pick = useCoffeePick();
  const { state, goMain, goFilter, goBrand } = pick;

  const onNavigate = (screen: Screen) => {
    if (screen === 'main') goMain();
    else if (screen === 'filter') goFilter();
    else if (screen === 'brand') goBrand();
  };

  return (
    <div className={styles.frame}>
      {state.screen === 'main' && <MainScreen pick={pick} onNavigate={onNavigate} />}
      {state.screen === 'filter' && <FilterScreen pick={pick} onNavigate={onNavigate} />}
      {state.screen === 'brand' && <BrandScreen pick={pick} onNavigate={onNavigate} />}
      {state.screen === 'result' && <ResultScreen pick={pick} />}
    </div>
  );
}

export default App;
