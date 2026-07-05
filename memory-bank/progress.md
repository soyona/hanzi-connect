# Progress - 任务看板

## 🟩 Phase 1: 基础设施与字典硬编码 (源码基准已完成)
- [ ] 初始化 Vite + React + TS + Tailwind 工程环境
- [x] 创建 `memory-bank/` 各规范文件，确认基准
- [x] 落地 `src/types/game.ts` 强类型数据契约
- [x] 编写基于“教育部小学常用字库”的静态 `dictionary.json` (首批支持 56 组常用字对)
- [x] `npm run build` 中的 TypeScript 编译检查通过（无类型错误）
- [ ] Vite 生产构建通过（当前受阻：根目录缺少 `index.html`，不在本任务允许写入范围内）

## 🟨 Phase 2: 核心状态机与矩阵生成算法 (挂起)
- [ ] 实现 `GameContext` 状态管理 (包含状态机流转逻辑)
- [ ] 编写 Fisher-Yates 卡牌对打散与矩阵生成函数
- [ ] 编写双卡牌 `matchCheck` 核心校验函数

## 🟨 Phase 3: UI 表现层与交互开发 (挂起)
- [ ] 封装 `CardItem` 组件，实现 `idle` / `selected` / `matched` 样式切换
- `GridBoard` 响应式栅格布局 (兼容 4x4 / 6x6)
- [ ] 实现时间倒计时定时器与生命值组件

## 🟨 Phase 4: 本地持久化与调优 (挂起)
- [ ] 接入 `LocalStorage` 进行最高分和解锁关卡持久化
- [ ] 极限测试：确保无生僻字污染、无边缘死锁情况

## 🟥 Phase 5: 交付前 Diff 差分审计 (挂起)
- [ ] 运行 Lint 与 Build 编译校验，触发合规性检查
