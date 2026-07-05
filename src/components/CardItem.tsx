import type { CardNode } from '../types';

interface CardItemProps {
  card: CardNode;
  disabled?: boolean;
  onSelect: (cardId: string) => void;
}

const STATUS_STYLES: Record<CardNode['status'], string> = {
  idle:
    'cursor-pointer border-orange-100 bg-gradient-to-br from-white to-orange-50 text-slate-700 shadow-md shadow-orange-100/70 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg focus-visible:ring-orange-400',
  selected:
    'scale-105 cursor-pointer border-sky-400 bg-sky-50 text-sky-700 shadow-lg shadow-sky-200/80 ring-4 ring-sky-200 focus-visible:ring-sky-500',
  matched:
    'pointer-events-none scale-75 border-transparent bg-transparent text-transparent opacity-0 shadow-none',
};

export function CardItem({
  card,
  disabled = false,
  onSelect,
}: CardItemProps) {
  const isMatched = card.status === 'matched';
  const isDisabled = isMatched || disabled;
  const typeName = card.type === 'radical' ? '偏旁' : '部件';

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={`${typeName} ${card.content}${isMatched ? '，已消除' : ''}`}
      aria-pressed={card.status === 'selected'}
      onClick={() => onSelect(card.id)}
      className={`flex aspect-square w-full items-center justify-center rounded-xl border-2 text-4xl font-black leading-none transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 sm:rounded-2xl sm:text-5xl md:rounded-3xl md:text-6xl ${STATUS_STYLES[card.status]}`}
    >
      {card.content}
    </button>
  );
}
