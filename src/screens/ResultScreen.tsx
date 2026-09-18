import { IconButton } from '../components/IconButton';
import { TagPill } from '../components/TagPill';
import type { useCoffeePick } from '../hooks/useCoffeePick';
import styles from './ResultScreen.module.css';

type CoffeePick = ReturnType<typeof useCoffeePick>;

interface ResultScreenProps {
  pick: CoffeePick;
}

export function ResultScreen({ pick }: ResultScreenProps) {
  const { state, goDraw, draw } = pick;
  const picked = state.pickedItem;
  const hasPicked = !!picked;

  return (
    <div className={styles.screen}>
      <div className={styles.dotRed} />
      <div className={styles.dotMint} />
      <div className={styles.dotYellow} />
      <div className={styles.dotPurple} />

      <div className={styles.closeRow}>
        <IconButton onClick={goDraw} ariaLabel="닫기">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.2}>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </IconButton>
      </div>

      {hasPicked && picked && (
        <>
          <div className={styles.celebrateTitle}>
            <div>짜잔! 🎉</div>
          </div>
          <div className={styles.pickedBody}>
            <div className={styles.capsuleSplit}>
              <div className={styles.capsuleLeft} />
              <div className={styles.capsuleRight} />
            </div>
            <div className={styles.pickedText}>
              <div className={styles.pickedName}>{picked.name}</div>
              <div className={styles.pickedMeta}>
                {picked.brandLabel} · {picked.price.toLocaleString('ko-KR')}원
              </div>
            </div>
            <div className={styles.tags}>
              {picked.tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>
          </div>
        </>
      )}

      {!hasPicked && (
        <div className={styles.noResultBody}>
          <div className={styles.noResultTitle}>앗, 조건에 맞는 메뉴가 없어요 😢</div>
          <div className={styles.noResultHint}>필터나 브랜드를 조금 더 넓혀보세요!</div>
        </div>
      )}

      <div className={styles.footer}>
        {hasPicked && (
          <button type="button" className={styles.decideButton} onClick={goDraw}>
            이 메뉴로 결정!
          </button>
        )}
        <button type="button" className={styles.redrawButton} onClick={draw}>
          다시 뽑기!
        </button>
      </div>
    </div>
  );
}
