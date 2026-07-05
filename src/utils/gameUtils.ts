import dictionaryData from '../data/dictionary.json';
import type {
  CardNode,
  CharacterDictionary,
  LevelConfig,
} from '../types';

export type MatchResult = 'same-type' | 'matched' | 'mismatched';

const dictionary = dictionaryData as CharacterDictionary;
const GRADE_RADICALS: Record<
  LevelConfig['grade'],
  readonly string[] | null
> = {
  '1上': ['氵', '亻', '木', '口'],
  '1下': ['氵', '亻', '扌', '木', '口', '女'],
  '2上': null,
  '2下': null,
};

/**
 * In-place Fisher-Yates shuffle. A copied array is returned so callers keep
 * ownership of their input.
 */
export function fisherYatesShuffle<T>(items: readonly T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

/**
 * Builds a complete card matrix from distinct dictionary pairs.
 */
export function generateCardMatrix(
  level: LevelConfig,
  sourceDictionary: CharacterDictionary = dictionary,
): CardNode[] {
  const pairCount = level.gridSize / 2;
  const allowedRadicals = GRADE_RADICALS[level.grade];
  const dictionaryEntries = Object.entries(sourceDictionary).filter(
    ([radical]) =>
      allowedRadicals === null || allowedRadicals.includes(radical),
  );
  const availablePairs = dictionaryEntries.flatMap(
    ([radical, components]) =>
      components.map((component) => ({ radical, component })),
  );

  if (availablePairs.length < pairCount) {
    throw new Error(
      `Grade ${level.grade} contains ${availablePairs.length} eligible pairs; ${pairCount} are required.`,
    );
  }

  const selectedPairs = fisherYatesShuffle(availablePairs).slice(0, pairCount);
  const cards = selectedPairs.flatMap<CardNode>(
    ({ radical, component }, pairIndex) => [
      {
        id: `pair-${pairIndex}-radical`,
        content: radical,
        type: 'radical',
        status: 'idle',
      },
      {
        id: `pair-${pairIndex}-component`,
        content: component,
        type: 'component',
        status: 'idle',
      },
    ],
  );

  return fisherYatesShuffle(cards);
}

export function isValidCardMatch(
  firstCard: CardNode,
  secondCard: CardNode,
  sourceDictionary: CharacterDictionary = dictionary,
): boolean {
  if (firstCard.type === secondCard.type) {
    return false;
  }

  const radicalCard =
    firstCard.type === 'radical' ? firstCard : secondCard;
  const componentCard =
    firstCard.type === 'component' ? firstCard : secondCard;

  return (
    sourceDictionary[radicalCard.content]?.includes(componentCard.content) ??
    false
  );
}

export function matchCheck(
  firstCard: CardNode,
  secondCard: CardNode,
  sourceDictionary: CharacterDictionary = dictionary,
): MatchResult {
  if (firstCard.type === secondCard.type) {
    return 'same-type';
  }

  return isValidCardMatch(firstCard, secondCard, sourceDictionary)
    ? 'matched'
    : 'mismatched';
}
