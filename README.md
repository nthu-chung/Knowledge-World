# Knowledge World 3D — Taiwan AI Supply Chain

把 `TW-stock-supply` Obsidian vault 的台灣 AI / 半導體供應鏈，轉成可遊玩的低多邊形 3D 世界。

## 遊戲內容

- 六個產業區域：IC 設計、晶圓與封裝、記憶體與載板、AI Server、散熱與能源、高速互連。
- 五十多個公司與概念節點，內容保留原始 Obsidian path 與更新日期。
- 第三人稱角色、跑步、跳躍、輕量碰撞與跟隨鏡頭。
- 主線任務：從 IC 設計走到 AI Factory。
- 知識探索、XP、資料碎片與 minimap。
- 程序化 low-poly 幾何，不需要下載大型 3D 模型或高階顯卡。

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

- `WASD` / 方向鍵：移動
- `Shift`：跑步
- `Space`：跳躍
- `E`：探索附近節點
- `Esc`：關閉知識卡片

## 資料來源

目前遊戲資料整理自 `nthu-chung/TW-stock-supply` 的 `index.md`、公司研究頁與概念頁。靜態轉換結果位於：

```text
src/data/twSupplyChain.ts
```

完整 vault importer（YAML frontmatter、wikilinks、relation types）列在 `ARCHITECTURE.md` 的下一階段。
