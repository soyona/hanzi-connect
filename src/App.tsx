import { ControlPanel } from './components/ControlPanel';
import { GameBoard } from './components/GameBoard';
import { Header } from './components/Header';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <main className="relative flex h-screen h-[100dvh] flex-col justify-between overflow-hidden bg-amber-50 px-2 py-4 text-slate-800 sm:px-4">
        <div
          aria-hidden="true"
          className="absolute -left-16 top-24 h-48 w-48 rounded-full bg-orange-200/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 bottom-16 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl"
        />

        <div className="relative mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-between">
          <div className="shrink-0 text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-orange-500 sm:text-sm">
              偏旁 · 部件 · 拼汉字
            </p>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
              汉字连连看
            </h1>
          </div>

          <Header />

          <section className="relative flex min-h-0 flex-1 flex-col justify-between rounded-[1.5rem] border border-white/80 bg-white/80 p-2 shadow-xl shadow-orange-100/70 backdrop-blur sm:rounded-[2rem] sm:p-3">
            <GameBoard />
            <ControlPanel />
          </section>
        </div>
      </main>
    </GameProvider>
  );
}
