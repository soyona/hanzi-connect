# Hanzi Connect (汉字连连看) 🎮 · v1.1.0

一个面向低年级儿童（一/二年级）设计的汉字偏旁部首高效配对连连看游戏。

本项目是 **Spec-Driven Solo (V1.0.0)** 规范（即：基于全栈记忆银行文档驱动、状态机闭环契约、AI 高确定性协同的方法论）的官方实战演示案例。在多轮跨越式重构中实现了 100% 生产环境绿灯打包，无一例状态死锁。

## ✨ 核心特性

- 📚 **教材同步**：支持按“一年级上/下”、“二年级上/下”选择关卡，字库难度梯度完美匹配儿童识字量。
- 👁️ **大字卡主视觉**：激进放大的汉字字号（text-4xl 至 text-6xl），对儿童视力极其友好。
- 🛡️ **防乱点拦截锁**：内置 300ms 异步交互状态锁，彻底拦截多指高频乱点引发的代码并发 Bug。
- 🕊️ **零滚动条防线**：100% 视口高度自适应（Viewport-Fit），在 PC 和移动端真机上完美一屏展现，绝不触发纵向滚动。
- 🌟 **无压轻松模式**：支持一键开启无限不计时模式，包容低年级儿童的挫败感。
- 💾 **本地持久化**：具备异常防崩机制的 LocalStorage 最高分与关卡解锁进度存储。

## 📐 Spec-Driven Solo 规范实战记录

本项目最大的特色在于全流程采用了 **Memory Bank (记忆银行)** 架构进行白盒开发。你可以在 `memory-bank/` 目录下看到完整的技术图纸：
- `productContext.md`：确立了“全屏无滚动”等视觉宪法与产品愿景。
- `systemArchitecture.md`：规范了状态机流转与 Fisher-Yates 矩阵无偏打散算法。
- `dataModels.md`：定义了严谨的强类型契约。
- `progress.md`：记录了 Phase 1 至 Phase 5 零瞎猜、高确定的原子化演进历程。

## 🚀 技术栈与本地运行

项目采用纯静态、无后端、高性能架构构建：
- **Core**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Vite

```bash
# 克隆项目
git clone https://github.com/soyona/hanzi-connect.git

# 安装依赖
npm install

# 本地热预览 (支持真机扫码)
npm run dev -- --host

# 生产环境编译
npm run build
```