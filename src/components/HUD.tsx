import { knowledgeNodes } from '../data/knowledgeGraph'
import { useGameStore } from '../store/useGameStore'

export function HUD() {
  const xp = useGameStore((state) => state.xp)
  const discovered = useGameStore((state) => state.discoveredIds.length)
  const nearby = useGameStore((state) => state.nearbyNode)

  return (
    <div className="hud">
      <header className="top-bar glass">
        <div>
          <p className="eyebrow">KNOWLEDGE EXPEDITION</p>
          <h1>Mindscape</h1>
        </div>
        <div className="stats">
          <span><b>{xp}</b> XP</span>
          <span><b>{discovered}</b> / {knowledgeNodes.length} nodes</span>
        </div>
      </header>

      <section className="mission glass">
        <p className="eyebrow">CURRENT QUEST</p>
        <strong>探索你的第一條知識路徑</strong>
        <p>接近發光節點，按下 E 閱讀內容並取得 XP。</p>
      </section>

      <section className="controls glass">
        <span><kbd>WASD</kbd> / <kbd>↑↓←→</kbd> 移動</span>
        <span><kbd>E</kbd> 互動</span>
      </section>

      {nearby && (
        <div className="interaction-prompt">
          <kbd>E</kbd>
          <span>探索 {nearby.title}</span>
        </div>
      )}
    </div>
  )
}
