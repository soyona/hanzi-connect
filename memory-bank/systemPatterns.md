# System Patterns - 技术架构与设计模式

## 1. 技术栈选型
* **构建工具**：Vite
* **核心框架**：React 18+ (TypeScript)
* **样式框架**：Tailwind CSS
* **状态管理**：React Context + `useReducer` (收敛复杂的游戏核心状态流转)

## 2. 游戏核心状态机 (Game State Machine)
[ IDLE ] --(点击开始/选关)--> [ PLAYING ] --(时间耗尽/生命值为0)--> [ GAMEOVER ]
|
(所有卡牌消除)
v
[ SUCCESS ]

## 3. 组件层级架构 (Component Hierarchy)
* `App.tsx` (根节点，路由/基础布局)
  * `GameProvider` (全局状态上下文)
    * `Header` (分数、关卡、时间/生命值状态栏)
    * `GameBoard` (4x4 或 6x6 卡牌矩阵容器)
      * `CardItem` (单张卡牌，处理高亮/消除状态变化)
    * `ControlPanel` (重新开始、暂停、选关模态框)

## 4. 核心算法设计
* **匹配算法**：当且仅当用户选择了一张 `radical` 和一张 `component` 类型的卡牌时触发校验。
  * 设选择卡牌为 $C_1, C_2$。
  * 检查 `Dictionary[C_radical]` 中是否包含 `C_component`。若包含，状态置为 `matched`；若不包含，触发错误扣分并重置。
* **矩阵生成算法**：
  1. 从字典中随机抽取 $\frac{N}{2}$ 组（$N$ 为矩阵格子总数）合法的“偏旁-部件”对。
  2. 将抽取的偏旁放入 `radical` 组，部件放入 `component` 组。
  3. 通过 Fisher-Yates 算法对这两组共 $N$ 张卡牌进行完全随机打散，确保不可预测性。