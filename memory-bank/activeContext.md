# Active Context - 当前会话聚焦

## 当前聚焦目标
* 执行 V1.1 年级同步与视口调优。

## 当前工作文件
* `src/App.tsx`
* `src/components/Header.tsx`
* `src/components/GameBoard.tsx`
* `src/components/CardItem.tsx`
* `src/components/ControlPanel.tsx`
* `src/context/GameContext.tsx`
* `src/types/game.ts`
* `src/utils/gameUtils.ts`
* `src/main.tsx`
* `src/index.css`
* `tailwind.config.js`
* `postcss.config.js`
* `memory-bank/progress.md`
* `memory-bank/activeContext.md`

## 已完成
* 已实现 `IDLE -> PLAYING -> GAMEOVER / SUCCESS` 游戏状态机。
* 已通过 Context API 与 `useReducer` 统一管理卡牌、选择、得分、时间、生命和关卡状态。
* 已实现基于静态字典的随机配对抽样、唯一卡牌 ID 与 Fisher-Yates 打散。
* 已实现同类型拒绝、合法配对消除加分、非法配对扣除生命值的双卡牌校验。
* `npm run build` 已通过，TypeScript 与 Vite 生产构建均无错误。
* 已在 `App.tsx` 接入 `GameProvider`，并完成 Header / GameBoard / ControlPanel 组件组合。
* 已实现 4x4 / 6x6 响应式棋盘、卡牌三态样式、每秒倒计时与关卡状态展示。
* 已实现关卡选择、GAMEOVER / SUCCESS 结果模态框和当前关卡重新开始。
* 已完成桌面与 390px 移动端渲染验证，无横向溢出或控制台错误。
* 最终 `npm run build` 已通过。
* 已从 LocalStorage 的 `highestScore`、`unlockedLevel` 初始化历史最高分与最高解锁关卡。
* 已在成功通关时持久化更高分数。
* 已在第二次选牌计算后启用 300ms reducer 级交互锁，高频点击在锁定期间直接拦截。
* Phase 4 最终 `npm run build` 已通过。
* 已完成 V1.1 四学期配置流，支持每个年级独立开启轻松不计时模式。
* 已实现 `TICK` 无压短路与“∞ 轻松模式”状态展示。
* 已按年级限制候选偏旁范围：一年级上册仅使用 4 个基础偏旁，二年级解锁全部字库。
* 已完成 4×4 / 6×6 全屏无滚动布局与巨大字号卡牌。
* 已在 1280×720、390×844 视口验证页面无横向或纵向溢出。
* V1.1 最终 `npm run build` 已通过。

## 当前阻塞
* 无。
