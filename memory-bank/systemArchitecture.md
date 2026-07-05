# System Architecture - 系统架构

## V1.1 教材年级字库同步

### 目标

未来的 `dictionary.json` 必须为每一组合法字对提供教材年级学期标签，使 `LevelConfig.grade` 可以直接决定本局候选字库。首期支持 `1上`、`1下`、`2上`、`2下`。

### 目标数据结构

现有“偏旁 → 部件数组”的无标签映射将迁移为带元数据的字对列表：

```json
{
  "version": "1.1",
  "pairs": [
    {
      "radical": "氵",
      "component": "每",
      "character": "海",
      "grade": "1上"
    }
  ]
}
```

`character` 用于教材字表审计和内容展示，`radical` 与 `component` 继续服务于现有配对判定。`grade` 必须使用 `LevelConfig.grade` 的同一联合类型，禁止自由文本标签。

### 过滤与出题流程

1. 游戏启动时读取并校验 `dictionary.json`，按 `grade` 建立只读索引。
2. 玩家选择年级学期后，将所选值写入 `LevelConfig.grade`。
3. 矩阵生成器仅从 `pair.grade === level.grade` 的字对池中取样。
4. 对候选池按 `radical + component + character` 去重，再执行随机抽样和 Fisher-Yates 打散。
5. 生成棋盘前校验候选字对数不少于 `gridSize / 2`；不足时返回明确的配置错误，禁止静默混入其他年级字对。

年级过滤应位于矩阵生成之前，匹配算法只接收已过滤的本局字对。这样教材同步、难度选择与卡牌状态机保持解耦，后续更新字库无需改动匹配规则。
