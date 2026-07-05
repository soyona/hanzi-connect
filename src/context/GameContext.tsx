import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { CardNode, GameStorageData, LevelConfig } from '../types';
import { generateCardMatrix, matchCheck } from '../utils/gameUtils';

export type GameStatus = 'IDLE' | 'PLAYING' | 'GAMEOVER' | 'SUCCESS';

export interface GameState {
  status: GameStatus;
  cards: CardNode[];
  selectedCardId: string | null;
  score: number;
  timeRemaining: number;
  lives: number;
  currentLevel: LevelConfig | null;
  highestScore: number;
  unlockedLevel: number;
  isInteractionLocked: boolean;
}

type GameAction =
  | { type: 'START_GAME'; level: LevelConfig }
  | { type: 'SELECT_CARD'; cardId: string }
  | { type: 'TICK' }
  | { type: 'UNLOCK_INTERACTION' }
  | { type: 'RESET_GAME' };

interface GameContextValue {
  state: GameState;
  startGame: (level: LevelConfig) => void;
  selectCard: (cardId: string) => void;
  tick: () => void;
  resetGame: () => void;
}

const MATCH_SCORE = 10;
const INTERACTION_LOCK_DURATION_MS = 300;
const STORAGE_KEYS = {
  highestScore: 'highestScore',
  unlockedLevel: 'unlockedLevel',
  currentTheme: 'currentTheme',
} as const;
const DEFAULT_STORAGE_DATA: GameStorageData = {
  highestScore: 0,
  unlockedLevel: 1,
  currentTheme: 'default',
};

export const initialGameState: GameState = {
  status: 'IDLE',
  cards: [],
  selectedCardId: null,
  score: 0,
  timeRemaining: 0,
  lives: 0,
  currentLevel: null,
  highestScore: DEFAULT_STORAGE_DATA.highestScore,
  unlockedLevel: DEFAULT_STORAGE_DATA.unlockedLevel,
  isInteractionLocked: false,
};

function readStorageData(): GameStorageData {
  if (typeof window === 'undefined') {
    return DEFAULT_STORAGE_DATA;
  }

  try {
    const storedHighestScore = Number(
      window.localStorage.getItem(STORAGE_KEYS.highestScore),
    );
    const storedUnlockedLevel = Number(
      window.localStorage.getItem(STORAGE_KEYS.unlockedLevel),
    );
    const storedTheme = window.localStorage.getItem(
      STORAGE_KEYS.currentTheme,
    );

    return {
      highestScore:
        Number.isFinite(storedHighestScore) && storedHighestScore >= 0
          ? storedHighestScore
          : DEFAULT_STORAGE_DATA.highestScore,
      unlockedLevel:
        Number.isInteger(storedUnlockedLevel) && storedUnlockedLevel >= 1
          ? storedUnlockedLevel
          : DEFAULT_STORAGE_DATA.unlockedLevel,
      currentTheme: storedTheme ?? DEFAULT_STORAGE_DATA.currentTheme,
    };
  } catch {
    return DEFAULT_STORAGE_DATA;
  }
}

function loadInitialGameState(): GameState {
  const storedData = readStorageData();
  return {
    ...initialGameState,
    highestScore: storedData.highestScore,
    unlockedLevel: storedData.unlockedLevel,
  };
}

function persistProgress(
  highestScore: number,
  unlockedLevel: number,
): void {
  try {
    window.localStorage.setItem(
      STORAGE_KEYS.highestScore,
      String(highestScore),
    );
    window.localStorage.setItem(
      STORAGE_KEYS.unlockedLevel,
      String(unlockedLevel),
    );
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

function resetSelectedCards(cards: CardNode[]): CardNode[] {
  return cards.map((card) =>
    card.status === 'selected' ? { ...card, status: 'idle' } : card,
  );
}

export function gameReducer(
  state: GameState,
  action: GameAction,
): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        status: 'PLAYING',
        cards: generateCardMatrix(action.level),
        selectedCardId: null,
        score: 0,
        timeRemaining: action.level.timeLimit,
        lives: action.level.allowedErrors,
        currentLevel: action.level,
        highestScore: state.highestScore,
        unlockedLevel: state.unlockedLevel,
        isInteractionLocked: false,
      };

    case 'SELECT_CARD': {
      if (state.status !== 'PLAYING') {
        return state;
      }

      const selectedCardCount = state.cards.reduce(
        (count, card) => count + (card.status === 'selected' ? 1 : 0),
        0,
      );
      if (state.isInteractionLocked || selectedCardCount >= 2) {
        return state;
      }

      const selectedCard = state.cards.find(
        (card) => card.id === action.cardId,
      );
      if (
        !selectedCard ||
        selectedCard.status === 'matched' ||
        selectedCard.id === state.selectedCardId
      ) {
        return state;
      }

      if (state.selectedCardId === null) {
        return {
          ...state,
          cards: state.cards.map((card) =>
            card.id === selectedCard.id
              ? { ...card, status: 'selected' }
              : card,
          ),
          selectedCardId: selectedCard.id,
        };
      }

      const firstCard = state.cards.find(
        (card) => card.id === state.selectedCardId,
      );
      if (!firstCard) {
        return {
          ...state,
          cards: resetSelectedCards(state.cards),
          selectedCardId: null,
        };
      }

      const result = matchCheck(firstCard, selectedCard);
      if (result === 'same-type') {
        return {
          ...state,
          cards: resetSelectedCards(state.cards),
          selectedCardId: null,
          isInteractionLocked: true,
        };
      }

      if (result === 'matched') {
        const cards = state.cards.map((card) =>
          card.id === firstCard.id || card.id === selectedCard.id
            ? { ...card, status: 'matched' as const }
            : card,
        );
        const allCardsMatched = cards.every(
          (card) => card.status === 'matched',
        );
        const score = state.score + MATCH_SCORE;

        return {
          ...state,
          status: allCardsMatched ? 'SUCCESS' : 'PLAYING',
          cards,
          selectedCardId: null,
          score,
          highestScore: allCardsMatched
            ? Math.max(state.highestScore, score)
            : state.highestScore,
          isInteractionLocked: true,
        };
      }

      const lives = Math.max(0, state.lives - 1);
      return {
        ...state,
        status: lives === 0 ? 'GAMEOVER' : 'PLAYING',
        cards: resetSelectedCards(state.cards),
        selectedCardId: null,
        lives,
        isInteractionLocked: true,
      };
    }

    case 'TICK': {
      if (
        state.status !== 'PLAYING' ||
        state.currentLevel?.isInfiniteTime
      ) {
        return state;
      }

      const timeRemaining = Math.max(0, state.timeRemaining - 1);
      return {
        ...state,
        status: timeRemaining === 0 ? 'GAMEOVER' : 'PLAYING',
        selectedCardId: timeRemaining === 0 ? null : state.selectedCardId,
        cards:
          timeRemaining === 0
            ? resetSelectedCards(state.cards)
            : state.cards,
        timeRemaining,
        isInteractionLocked:
          timeRemaining === 0 ? false : state.isInteractionLocked,
      };
    }

    case 'UNLOCK_INTERACTION':
      return state.isInteractionLocked
        ? { ...state, isInteractionLocked: false }
        : state;

    case 'RESET_GAME':
      return {
        ...initialGameState,
        highestScore: state.highestScore,
        unlockedLevel: state.unlockedLevel,
      };

    default:
      return state;
  }
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState,
    loadInitialGameState,
  );

  useEffect(() => {
    if (!state.isInteractionLocked) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: 'UNLOCK_INTERACTION' });
    }, INTERACTION_LOCK_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [state.isInteractionLocked]);

  useEffect(() => {
    if (state.status === 'SUCCESS') {
      persistProgress(state.highestScore, state.unlockedLevel);
    }
  }, [state.highestScore, state.status, state.unlockedLevel]);

  const startGame = useCallback((level: LevelConfig) => {
    dispatch({ type: 'START_GAME', level });
  }, []);

  const selectCard = useCallback((cardId: string) => {
    dispatch({ type: 'SELECT_CARD', cardId });
  }, []);

  const tick = useCallback(() => {
    dispatch({ type: 'TICK' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const value = useMemo(
    () => ({ state, startGame, selectCard, tick, resetGame }),
    [resetGame, selectCard, startGame, state, tick],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider.');
  }

  return context;
}
