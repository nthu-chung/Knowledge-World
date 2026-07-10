import { knowledgeNodes, mainQuest, nodeById } from '../data/twSupplyChain'
import { useGameStore } from '../store/useGameStore'

export function HUD() {
  const nearby = useGameStore((state) => state.nearbyNode)
  const discovered = useGameStore((state) => state.discoveredIds.length)
  const shards = useGameStore((state) => state.collectedShardIds.length)
  const xp = useGameStore((state) => state.xp)
  const questIndex = useGameStore((state) => state.questIndex)
  const showIntro = useGameStore((state) => state.showIntro)
  const dismissIntro = useGameStore((state) => state.dismissIntro)
  const currentId = mainQuest.orderedNodeIds[questIndex]
  const currentNode = currentId ? nodeById.get(currentId) : null

  return (
    <>
      <section className="hud-card hud-top-left">
        <p className="eyebrow">KNOWLEDGE WORLD / TW AI</p>
        <h1>半導體供應鏈世界</h1>
        <div className="stat-row">
          <span>XP <strong>{xp}</strong></span>
          <span>探索 <strong>{discovered}/{knowledgeNodes.length}</strong></span>
          <span>資料碎片 <strong>{shards}/24</strong></span>
        </div>
      </section>
      <section className="hud-card quest-card">
        <p className="eyebrow">MAIN QUEST</p>
        <h2>{mainQuest.title}</h2>
        <p>{questIndex >= mainQuest.orderedNodeIds.length ? `完成，獲得 ${mainQuest.reward} XP` : `下一站：${currentNode?.title ?? ''}`}</p>
        <div className="progress-track"><div style={{ width: `${(questIndex / mainQuest.orderedNodeIds.length) * 100}%` }} /></div>
      </section>
      <section className="hud-card controls-card">
        <span><kbd>WASD</kbd> 移動</span><span><kbd>Shift</kbd> 跑步</span><span><kbd>Space</kbd> 跳躍</span><span><kbd>E</kbd> 探索</span>
      </section>
      {nearby && <div className="interaction-prompt"><kbd>E</kbd><span>探索 {nearby.title}</span></div>}
      {showIntro && (
        <div className="intro-overlay" role="dialog" aria-modal="true">
          <div className="intro-card">
            <p className="eyebrow">OBSIDIAN VAULT → PLAYABLE WORLD</p>
            <h2>走進台灣 AI 供應鏈</h2>
            <p>六個產業區域、五十多個知識節點，以及一條從 IC 設計到 AI Factory 的主線任務。世界採低多邊形與程序化幾何，不需要高階顯卡。</p>
            <button onClick={dismissIntro}>開始探索</button>
          </div>
        </div>
      )}
    </>
  )
}
