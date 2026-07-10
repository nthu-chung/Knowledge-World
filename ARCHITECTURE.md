# Architecture

## 1. Product concept

Knowledge World 3D 把個人知識庫轉換成可探索的遊戲世界：

- **Knowledge node**：概念、文章、論文、程式碼、人物或專案。
- **Knowledge edge**：先備關係、引用、相似度或因果關係。
- **Region**：依 embedding clustering 形成的主題區域。
- **Quest**：由學習目標產生的探索路徑。
- **Player progression**：已讀內容、測驗表現、技能與 XP。

## 2. MVP frontend

```text
src/
├── components/
│   ├── KnowledgeWorld.tsx   # Three.js scene root
│   ├── WorldEnvironment.tsx # light, floor, stars and fog
│   ├── Player.tsx           # movement, camera and proximity interaction
│   ├── KnowledgeNode.tsx    # visual representation of one node
│   ├── KnowledgeLinks.tsx   # prerequisite edges
│   ├── HUD.tsx              # mission, XP and controls
│   └── KnowledgePanel.tsx   # node content overlay
├── data/
│   └── knowledgeGraph.ts    # temporary static graph
├── store/
│   └── useGameStore.ts      # client game state
└── types/
    └── knowledge.ts
```

## 3. Recommended production architecture

```text
[Web / Desktop Client]
React + R3F + Zustand
        |
        | HTTPS / WebSocket
        v
[Application API]
FastAPI or NestJS
        |
        +--> [PostgreSQL] users, quests, progression, ACL
        +--> [Neo4j] graph traversal and prerequisites
        +--> [Qdrant / pgvector] semantic retrieval
        +--> [S3-compatible storage] documents and assets
        +--> [LLM service] summarization, quiz and quest generation
        +--> [Ingestion workers] PDF / web / GitHub / Drive parsers
```

## 4. Core domain model

```ts
KnowledgeNode {
  id
  title
  sourceUri
  contentType
  summary
  embedding
  masteryScore
  regionId
  position3d
}

KnowledgeEdge {
  sourceId
  targetId
  relationType
  weight
}

Quest {
  id
  objective
  orderedNodeIds
  reward
  completionRule
}
```

## 5. Automatic world generation

1. Parse and chunk source documents.
2. Generate summaries and embeddings.
3. Build candidate edges using citations, links and cosine similarity.
4. Apply community detection to create knowledge regions.
5. Project embedding dimensions with UMAP into 2D/3D coordinates.
6. Run force-directed layout to improve separation and edge readability.
7. Persist positions, then stream visible chunks based on player location.

## 6. Game systems

- **Discovery**：第一次打開節點取得 XP。
- **Mastery**：閱讀、回想測驗與間隔重複決定 mastery score。
- **Quest generation**：根據目標與先備關係產生最短合理路徑。
- **Knowledge combat**：敵人代表 misconception；玩家透過回答或組合概念擊破。
- **NPC agents**：每個領域有一個具不同教學風格與工具權限的導師。
- **Fog of knowledge**：未探索區域保持模糊，完成先備節點後解鎖。

## 7. Scaling considerations

- 大型知識圖譜應使用 spatial partition / quadtree，只渲染附近節點。
- 3D 模型使用 instancing、LOD 與 compressed glTF。
- Node content 與 graph topology 分開快取。
- LLM 任務採非同步 job queue，前端透過 WebSocket 取得狀態。
- 所有外部知識來源必須保留 citation、版本與 ACL。

## 8. Security

- OAuth/OIDC authentication
- Per-source and per-node authorization
- Prompt injection filtering during ingestion
- Signed URLs for private assets
- Audit log for source imports and AI-generated transformations
