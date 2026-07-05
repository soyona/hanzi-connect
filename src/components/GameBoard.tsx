import { useGame } from '../context/GameContext';
import { CardItem } from './CardItem';

export function GameBoard() {
  const { state, selectCard } = useGame();
  const { cards, currentLevel, status } = state;

  if (status === 'IDLE') {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-[1.25rem] bg-gradient-to-b from-orange-50 to-white px-3 text-center">
        <div
          aria-hidden="true"
          className="grid h-16 w-16 grid-cols-2 gap-1 rounded-2xl bg-white p-2 shadow-lg shadow-orange-100 sm:h-20 sm:w-20"
        >
          {['氵', '木', '每', '羊'].map((character) => (
            <span
              key={character}
              className="flex items-center justify-center rounded-lg bg-orange-100 text-base font-black text-orange-600 sm:text-xl"
            >
              {character}
            </span>
          ))}
        </div>
        <h2 className="mt-2 text-lg font-black text-slate-700 sm:text-2xl">
          找出能组成汉字的伙伴
        </h2>
        <p className="mt-1 hidden max-w-md text-sm font-medium leading-5 text-slate-500 sm:block">
          选择一个偏旁和一个部件，配对成功即可消除。先在下方选择关卡吧！
        </p>
      </div>
    );
  }

  const gridColumns =
    currentLevel?.gridSize === 36 ? 'grid-cols-6' : 'grid-cols-4';

  return (
    <div
      aria-label="汉字连连看棋盘"
      className={`mx-auto grid aspect-square w-[min(100%,60vh)] max-h-[60vh] ${gridColumns} gap-1 sm:gap-2 md:gap-3`}
    >
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          disabled={status !== 'PLAYING'}
          onSelect={selectCard}
        />
      ))}
    </div>
  );
}
