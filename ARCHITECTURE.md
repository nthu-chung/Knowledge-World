# Architecture — Supply Chain Game World

## Product model

`TW-stock-supply` 是內容與研究的 source of truth；`Knowledge-World` 是遊戲化呈現層。這個版本先把 vault 的核心 index、公司摘要與代表性 thesis 轉成靜態 TypeScript graph，確保 clone 後可直接執行。

## Runtime stack

- React 19 + TypeScript + Vite
- Three.js + React Three Fiber + Drei
- Zustand game state
- 程序化 low-poly world，無外部 glTF / texture 依賴

## World mapping

| Obsidian | Game world |
|---|---|
| `topics` | 世界主題與 central hub |
| `concepts` | 水晶／科技樹節點 |
| `entities` | 公司建築 |
| wikilinks / supply-chain relation | 光路與道路 |
| metadata | ticker、區域、重要性、XP、來源 |

## Performance decision

曾評估：

- `pmndrs/ecctrl`：physics-driven character controller，支援 Rapier、ShapeCast、車輛、drone 與 custom gravity。
- `pmndrs/react-three-rapier`：Rapier WASM 的 R3F wrapper，具 RigidBody、collider、sensor、instancing 與 joints。

第一版沒有加入完整物理引擎，原因是：

1. 一般 MacBook 仍要同時繪製數十個知識節點。
2. 目前世界是平面區域與簡化建築，手動 kinematic movement 足夠。
3. 避免額外 WASM 初始化與 bundle dependency。

目前採：

- 固定低 DPR (`1–1.45`)
- primitive geometry + flat shading
- 僅附近節點顯示文字
- 少量 1024 shadow map
- instanced environment props
- 不使用 post-processing、HDRI 或高解析貼圖
- 角色使用輕量重力、跳躍、圓形建築碰撞與 world bounds

## Data model

```ts
KnowledgeNode {
  id
  title
  ticker?
  summary
  details[]
  kind: hub | company | concept
  regionId
  position3d
  importance
  sourcePath
  updatedAt
  xp
}

KnowledgeEdge {
  from
  to
  relation: supply | enables | related | group
}
```

## Next stage

1. Clone / read the private vault in CI or a local ingestion service.
2. Parse YAML frontmatter and all `[[wikilinks]]`.
3. Infer edge type from headings such as `Position in supply chain`.
4. Generate region clusters and positions offline.
5. Commit only sanitized graph output to public builds, or move the app to a private deployment.
6. Add Rapier only when stairs, moving platforms, physics puzzles or multiplayer collision become necessary.
7. Add NPC analyst agents, quizzes, fog of knowledge and boss battles for contradictory theses.
