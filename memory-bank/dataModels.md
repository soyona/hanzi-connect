# Data Models - 强类型数据契约

```typescript
/**
 * 卡牌类型定义
 */
export type CardType = 'radical' | 'component'; // radical: 左偏旁/上部首, component: 右部件/下部件

/**
 * 卡牌状态定义
 */
export type CardStatus = 'idle' | 'selected' | 'matched';

/**
 * 卡牌实例接口
 */
export interface CardNode {
  id: string;          // 唯一标识符 (例如: uuid 或 'radical-index')
  content: string;     // 偏旁符号或汉字部件 (如: '氵', '每')
  type: CardType;      // 偏旁或部件属性
  status: CardStatus;  // 当前交互状态
}

/**
 * 汉字合法性静态字典映射表接口
 * 结构示例: { "氵": ["每", "工", "马"], "亻": ["亍", "门"] }
 */
export interface CharacterDictionary {
  [radical: string]: string[];
}

/**
 * 游戏关卡配置接口
 */
export interface LevelConfig {
  grade: '1上' | '1下' | '2上' | '2下';
  gridSize: 16 | 36;   // 4x4=16 或 6x6=36
  timeLimit: number;   // 倒计时限制（秒）
  isInfiniteTime: boolean; // 是否启用不计时模式；为 true 时忽略 timeLimit
  allowedErrors: number; // 允许的最大错误次数（生命值）
}

/**
 * LocalStorage 状态持久化结构
 */
export interface GameStorageData {
  highestScore: number;
  unlockedLevel: number;
  currentTheme: string;
}
