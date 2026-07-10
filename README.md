# Knowledge World 3D

一個可遊玩的 3D 知識庫 MVP。使用者操控角色在知識世界中移動，接近知識節點後互動、閱讀內容、取得 XP，並沿著節點關係探索完整知識路徑。

## 目前功能

- 第三人稱角色移動與跟隨鏡頭
- 3D 知識節點與 prerequisite 連線
- 節點距離偵測與 `E` 鍵互動
- 知識卡片、探索進度與 XP
- 完全以程式化幾何建立，不依賴外部 3D assets
- Responsive HUD

## 技術棧

- React + TypeScript + Vite
- Three.js
- React Three Fiber
- Drei
- Zustand

## 執行

```bash
npm install
npm run dev
```

Production build：

```bash
npm run build
npm run preview
```

## 操作

- `WASD` 或方向鍵：移動
- `E`：探索附近知識節點
- `Esc`：關閉知識卡片

## 下一階段

1. 將靜態知識圖譜替換為 API / graph database。
2. 支援 Markdown、PDF、Notion、Google Drive、GitHub 等知識來源匯入。
3. 用 embedding + community detection 自動產生 3D 區域與節點位置。
4. 加入任務、技能樹、NPC 導師、測驗與 boss battle。
5. 加入多人協作、語音 agent 與個人學習紀錄。

詳細設計請見 [`ARCHITECTURE.md`](./ARCHITECTURE.md)。
