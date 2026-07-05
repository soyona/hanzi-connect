import { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { LevelConfig } from '../types';

const LEVELS: ReadonlyArray<
  LevelConfig & { title: string; description: string }
> = [
  {
    grade: '1上',
    gridSize: 16,
    timeLimit: 60,
    isInfiniteTime: false,
    allowedErrors: 3,
    title: '一年级上册',
    description: '4 × 4 · 60 秒',
  },
  {
    grade: '1下',
    gridSize: 16,
    timeLimit: 75,
    isInfiniteTime: false,
    allowedErrors: 3,
    title: '一年级下册',
    description: '4 × 4 · 75 秒',
  },
  {
    grade: '2上',
    gridSize: 36,
    timeLimit: 120,
    isInfiniteTime: false,
    allowedErrors: 3,
    title: '二年级上册',
    description: '6 × 6 · 120 秒',
  },
  {
    grade: '2下',
    gridSize: 36,
    timeLimit: 150,
    isInfiniteTime: false,
    allowedErrors: 3,
    title: '二年级下册',
    description: '6 × 6 · 150 秒',
  },
];

export function ControlPanel() {
  const { state, startGame } = useGame();
  const { currentLevel, score, status } = state;
  const [infiniteTimeByGrade, setInfiniteTimeByGrade] = useState<
    Record<LevelConfig['grade'], boolean>
  >({
    '1上': false,
    '1下': false,
    '2上': false,
    '2下': false,
  });

  if (status === 'IDLE') {
    return (
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {LEVELS.map((level) => (
          <div
            key={level.grade}
            className="rounded-2xl border-2 border-orange-100 bg-white p-2 shadow-sm transition hover:border-orange-300 hover:shadow-md sm:p-3"
          >
            <button
              type="button"
              onClick={() =>
                startGame({
                  ...level,
                  isInfiniteTime: infiniteTimeByGrade[level.grade],
                })
              }
              className="group flex w-full items-center justify-between rounded-xl px-1 py-1 text-left transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-slate-700 sm:text-lg">
                  {level.title}
                </span>
                <span className="block text-[11px] font-semibold text-slate-500 sm:text-sm">
                  {level.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-base font-black text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white sm:h-10 sm:w-10 sm:text-lg"
              >
                →
              </span>
            </button>

            <label className="mt-1 flex cursor-pointer items-center gap-1.5 rounded-xl bg-amber-50 px-2 py-1.5 text-[10px] font-bold leading-tight text-amber-800 sm:text-xs">
              <input
                type="checkbox"
                checked={infiniteTimeByGrade[level.grade]}
                onChange={(event) => {
                  const isInfiniteTime = event.target.checked;
                  setInfiniteTimeByGrade((current) => ({
                    ...current,
                    [level.grade]: isInfiniteTime,
                  }));
                }}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="relative h-5 w-9 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-emerald-500 peer-focus-visible:ring-4 peer-focus-visible:ring-emerald-200 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-4"
              />
              <span>🌟 开启轻松不计时模式</span>
            </label>
          </div>
        ))}
      </div>
    );
  }

  if (status !== 'GAMEOVER' && status !== 'SUCCESS') {
    return null;
  }

  const didSucceed = status === 'SUCCESS';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-result-title"
      className="absolute inset-0 flex items-center justify-center rounded-[2rem] bg-slate-900/35 p-5 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
        <div
          aria-hidden="true"
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
            didSucceed
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-orange-100 text-orange-600'
          }`}
        >
          {didSucceed ? '✓' : '⏳'}
        </div>
        <h2
          id="game-result-title"
          className="mt-5 text-2xl font-black text-slate-800"
        >
          {didSucceed ? '闯关成功！' : '本轮结束'}
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          {didSucceed
            ? `太棒了，你获得了 ${score} 分！`
            : `别灰心，本轮获得 ${score} 分，再试一次吧。`}
        </p>
        <button
          type="button"
          onClick={() => {
            if (currentLevel) {
              startGame(currentLevel);
            }
          }}
          className="mt-6 w-full rounded-2xl bg-orange-500 px-5 py-3 text-base font-black text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
        >
          重新开始
        </button>
      </div>
    </div>
  );
}
