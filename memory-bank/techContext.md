# 技术栈与依赖约束 (techContext.md)
## 1. 锁死技术栈
- 基础框架: [例如：Vite + React + TypeScript / Next.js]
- 样式表现: Tailwind CSS

## 2. 严禁引入的依赖黑名单 (Negative Constraints)
- 严禁引入外部复杂状态库（如 Redux），仅允许使用 React Context。
- 编译与运行命令: `npm run dev` / `npm run build`

## 3. 基础设施与忽略规则 (Git & Indexing Constraints)
* **环境硬约束**：根目录下必须锁死 `.gitignore` 配置文件。
* **索引隔离**：必须严格禁止智能体扫描 `node_modules/`、`dist/` 以及 Mac 系统自动生成的 `.DS_Store` 隐藏文件，确保局部扫描算力与 Token 消耗 100% 聚焦于三轨目录。