import { useMemo } from 'react';
import { BottomNav } from '../components/BottomNav';
import { FilterSheet } from '../components/FilterSheet';
import { DEFAULT_BRAND_COLOR, DRINK_OPTIONS, TYPE_BG, TYPE_LABEL } from '../data/menu';
import type { useCoffeePick } from '../hooks/useCoffeePick';
import type { Brand, Screen } from '../types';
import styles from './ExploreScreen.module.css';

type CoffeePick = ReturnType<typeof useCoffeePick>;

interface ExploreScreenProps {
  pick: CoffeePick;
  onNavigate: (screen: Screen) => void;
}

function avatarColorFor(brands: Brand[], brand: string): string {
  return brands.find((b) => b.key === brand)?.color ?? DEFAULT_BRAND_COLOR;
}

export function ExploreScreen({ pick, onNavigate }: ExploreScreenProps) {
  const {
    state,
    brands,
    exploreItems,
    setExploreView,
    setExploreQuery,
    setExploreTypeFilter,
    openExploreFilter,
    closeExploreFilter,
    resetExploreFilter,
  } = pick;

  const isListView = state.exploreView !== 'grid';
  const hasExploreTypeFilter = state.exploreTypeFilter !== 'all';

  const displayItems = useMemo(
    () =>
      exploreItems.map((m) => ({
        key: `${m.brand}-${m.name}`,
        name: m.name,
        brandLabel: m.brandLabel,
        priceLabel: `${m.price.toLocaleString('ko-KR')}원`,
        avatarColor: avatarColorFor(brands, m.brand),
        initial: m.brandLabel.slice(0, 1),
        imageUrl: m.imageUrl,
        typeLabel: TYPE_LABEL[m.type],
        typeBg: TYPE_BG[m.type],
      })),
    [exploreItems, brands],
  );

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.title}>메뉴 탐색 🔍</div>
          <div className={styles.count}>{displayItems.length}개의 메뉴를 찾았어요</div>
        </div>
        <div className={styles.viewToggle}>
          <button
            type="button"
            className={styles.viewButton}
            aria-label="목록형으로 보기"
            aria-pressed={isListView}
            style={{ background: isListView ? 'var(--color-accent-coral)' : 'transparent' }}
            onClick={() => setExploreView('list')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isListView ? '#FFFFFF' : '#B8AFD6'}
              strokeWidth={2.2}
              strokeLinecap="round"
            >
              <path d="M8 6h13M8 12h13M8 18h13" />
              <path d="M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.viewButton}
            aria-label="그리드형으로 보기"
            aria-pressed={!isListView}
            style={{ background: !isListView ? 'var(--color-accent-coral)' : 'transparent' }}
            onClick={() => setExploreView('grid')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={!isListView ? '#FFFFFF' : '#B8AFD6'}
              strokeWidth={2.2}
            >
              <rect x="3" y="3" width="8" height="8" rx="2" />
              <rect x="13" y="3" width="8" height="8" rx="2" />
              <rect x="3" y="13" width="8" height="8" rx="2" />
              <rect x="13" y="13" width="8" height="8" rx="2" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.searchRow}>
        <label className={styles.searchLabel}>
          <span>메뉴 검색</span>
          <div className={styles.searchInputWrap}>
            <svg
              className={styles.searchIcon}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth={2.2}
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="메뉴 이름이나 브랜드로 검색"
              value={state.exploreQuery}
              onChange={(e) => setExploreQuery(e.target.value)}
            />
          </div>
        </label>

        <button
          type="button"
          className={styles.filterIconButton}
          aria-label="필터"
          onClick={openExploreFilter}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth={2}>
            <path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5Z" />
          </svg>
          {hasExploreTypeFilter && <span className={styles.filterDot} />}
        </button>
      </div>

      <div className={styles.results}>
        {displayItems.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>앗, 찾는 메뉴가 없어요 😢</div>
            <div className={styles.emptyHint}>검색어나 필터를 조금 바꿔보세요!</div>
          </div>
        ) : isListView ? (
          displayItems.map((m) => (
            <div key={m.key} className={styles.listCard}>
              <div className={styles.listAvatar} style={{ background: m.avatarColor }}>
                {m.imageUrl ? (
                  <img className={styles.avatarImg} src={m.imageUrl} alt={m.name} />
                ) : (
                  m.initial
                )}
              </div>
              <div className={styles.listInfo}>
                <span className={styles.listName}>{m.name}</span>
                <span className={styles.listMeta}>
                  {m.brandLabel} · {m.priceLabel}
                </span>
              </div>
              <span className={styles.typeTag} style={{ background: m.typeBg }}>
                {m.typeLabel}
              </span>
            </div>
          ))
        ) : (
          <div className={styles.grid}>
            {displayItems.map((m) => (
              <div key={m.key} className={styles.gridCard}>
                <div className={styles.gridAvatar} style={{ background: m.avatarColor }}>
                  {m.imageUrl ? (
                    <img className={styles.avatarImg} src={m.imageUrl} alt={m.name} />
                  ) : (
                    m.initial
                  )}
                </div>
                <span className={styles.gridName}>{m.name}</span>
                <span className={styles.gridMeta}>
                  {m.brandLabel} · {m.priceLabel}
                </span>
                <span className={styles.gridTypeTag} style={{ background: m.typeBg }}>
                  {m.typeLabel}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active={state.screen} onNavigate={onNavigate} />

      {state.exploreFilterOpen && (
        <FilterSheet
          title="메뉴 필터"
          maxHeight="60%"
          onClose={closeExploreFilter}
          onReset={resetExploreFilter}
          sections={[
            {
              label: '음료 종류는?',
              ariaLabel: '음료 종류',
              options: DRINK_OPTIONS.map((opt) => ({
                key: opt.key,
                label: opt.label,
                selected: state.exploreTypeFilter === opt.key,
                accentColor: 'var(--color-accent-coral)',
                onSelect: () => setExploreTypeFilter(opt.key),
              })),
            },
          ]}
        />
      )}
    </div>
  );
}
