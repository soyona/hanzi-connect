/// <reference lib="es2020" />

/**
 * 卡牌类型。
 * radical 表示左偏旁或上部首，component 表示右部件或下部件。
 */
export type CardType = 'radical' | 'component';

/**
 * 卡牌当前的交互状态。
 */
export type CardStatus = 'idle' | 'selected' | 'matched';

/**
 * 游戏矩阵中的单张卡牌。
 */
export interface CardNode {
  id: string;
  content: string;
  type: CardType;
  status: CardStatus;
}

/**
 * 汉字合法性静态字典。
 *
 * 键为偏旁或部首，值为能够与其组成合法汉字的部件列表。
 */
export interface CharacterDictionary {
  [radical: string]: string[];
}

/**
 * 单个游戏关卡的固定配置。
 */
export interface LevelConfig {
  levelNumber: number;
  gridSize: 16 | 36;
  timeLimit: number;
  allowedErrors: number;
}

/**
 * 写入 LocalStorage 的游戏进度。
 */
export interface GameStorageData {
  highestScore: number;
  unlockedLevel: number;
  currentTheme: string;
}
