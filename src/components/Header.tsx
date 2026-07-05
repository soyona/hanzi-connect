import { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const LEVEL_NAMES = {
  '1上': '一年级上册',
  '1下': '一年级下册',
  '2上': '二年级上册',
  '2下': '二年级下册',
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function Header() {
  const { state, tick } = useGame();
  const { currentLevel, lives, score, status, timeRemaining } = state;

  useEffect(() => {
    if (status !== 'PLAYING' || currentLevel?.isInfiniteTime) {
      return undefined;
    }

    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, [currentLevel?.isInfiniteTime, status, tick]);

  const levelName = currentLevel
    ? LEVEL_NAMES[currentLevel.grade]
    : '选择关卡开始';
  const timeDisplay = currentLevel?.isInfiniteTime
    ? '∞ 轻松模式'
    : formatTime(timeRemaining);

  return (
    <header className="shrink-0 rounded-2xl border border-orange-100 bg-white px-3 py-2 shadow-sm sm:rounded-3xl sm:px-5 sm:py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
            当前关卡
          </p>
          <h2 className="text-base font-black text-slate-700 sm:text-lg">
            {levelName}
          </h2>
        </div>

        <dl className="grid grid-cols-3 gap-1.5 sm:w-auto sm:gap-3">
          <div className="min-w-0 rounded-xl bg-sky-50 px-2 py-1 text-center sm:min-w-24 sm:rounded-2xl sm:px-3 sm:py-2">
            <dt className="text-xs font-bold text-sky-600">得分</dt>
            <dd className="text-lg font-black tabular-nums text-sky-700 sm:text-xl">
              {score}
            </dd>
          </div>
          <div className="min-w-0 rounded-xl bg-amber-50 px-1 py-1 text-center sm:min-w-24 sm:rounded-2xl sm:px-3 sm:py-2">
            <dt className="text-xs font-bold text-amber-600">时间</dt>
            <dd
              aria-label={
                currentLevel?.isInfiniteTime
                  ? '轻松不计时模式'
                  : `剩余时间 ${timeDisplay}`
              }
              className={`whitespace-nowrap font-black tabular-nums text-amber-700 ${
                currentLevel?.isInfiniteTime
                  ? 'text-[11px] sm:text-sm'
                  : 'text-lg sm:text-xl'
              }`}
            >
              {timeDisplay}
            </dd>
          </div>
          <div className="min-w-0 rounded-xl bg-rose-50 px-2 py-1 text-center sm:min-w-24 sm:rounded-2xl sm:px-3 sm:py-2">
            <dt className="text-xs font-bold text-rose-600">生命</dt>
            <dd
              aria-label={`剩余 ${lives} 点生命`}
              className="text-lg font-black tracking-tight text-rose-600 sm:text-xl"
            >
              {lives > 0 ? '♥'.repeat(lives) : '0'}
            </dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
