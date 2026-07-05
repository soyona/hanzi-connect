# Progress - 任务看板

## 🟩 Phase 1: 基础设施与字典硬编码 (已完成)
- [x] 初始化 Vite + React + TS + Tailwind 工程环境
- [x] 创建 `memory-bank/` 各规范文件，确认基准
- [x] 落地 `src/types/game.ts` 强类型数据契约
- [x] 编写基于“教育部小学常用字库”的静态 `dictionary.json` (首批支持 56 组常用字对)
- [x] `npm run build` 中的 TypeScript 编译检查通过（无类型错误）
- [x] Vite 生产构建通过

## 🟩 Phase 2: 核心状态机与矩阵生成算法 (已完成)
- [x] 实现 `GameContext` 状态管理 (包含状态机流转逻辑)
- [x] 编写 Fisher-Yates 卡牌对打散与矩阵生成函数
- [x] 编写双卡牌 `matchCheck` 核心校验函数

## 🟩 Phase 3: UI 表现层与交互开发 (已完成)
- [x] 使用 `GameProvider` 完成根组件状态接线，并挂载 `Header`、`GameBoard`、`ControlPanel`
- [x] 封装 `CardItem` 组件，实现 `idle` / `selected` / `matched` 样式与交互切换
- [x] 实现 `GameBoard` 响应式栅格布局（兼容 4x4 / 6x6）
- [x] 实现 `Header` 得分、关卡、倒计时与生命值状态栏
- [x] 实现 `ControlPanel` 关卡选择、GAMEOVER / SUCCESS 模态框及重新开始
- [x] 补齐 Tailwind CSS 编译入口与基础样式
- [x] `npm run build` 通过，并完成桌面与移动端核心交互验证

## 🟩 Phase 4: 本地持久化与调优 (已完成)
- [x] 接入 `LocalStorage`，初始化并持久化 `highestScore` 与 `unlockedLevel`
- [x] 成功通关时持久化更高分数
- [x] 增加 300ms reducer 级交互锁，拦截动画期间的高频/多指重复点击
- [x] 保持静态字典不变，未引入新字库或生僻字污染
- [x] `npm run build` 通过

## 🟩 Phase 5: V1.1 教材同步、无压模式与视口调优 (已完成)
- [x] 提供“一年级上册 / 一年级下册 / 二年级上册 / 二年级下册”四种配置
- [x] 每种配置均支持独立切换“🌟 开启轻松不计时模式”
- [x] `TICK` 在无压模式直接短路，时间状态显示“∞ 轻松模式”
- [x] 一年级上册限制为 4 个基础偏旁；一年级下册扩展至 6 个；二年级使用全部 10 个偏旁与 56 组字对
- [x] 4×4 与 6×6 棋盘采用视口约束正方形布局，卡牌字号提升至 `text-4xl / text-5xl / text-6xl`
- [x] 1280×720 与 390×844 浏览器实测 `scrollHeight === innerHeight`，无横向或纵向滚动
- [x] 4×4 16 张卡牌、6×6 36 张卡牌均在当前视口完整展示
- [x] `npm run build` 通过

## 🟥 Phase 6: 交付前 Lint 审计 (挂起)
- [ ] 运行 Lint 合规性检查
