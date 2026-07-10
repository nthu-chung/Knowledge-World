import type { CSSProperties } from 'react'
import { regionById } from '../data/twSupplyChain'
import { useGameStore } from '../store/useGameStore'

export function KnowledgePanel() {
  const node = useGameStore((state) => state.selectedNode)
  const close = useGameStore((state) => state.selectNode)
  if (!node) return null
  const region = regionById.get(node.regionId)!
  return (
    <aside className="knowledge-panel" style={{ '--accent': region.accent } as CSSProperties}>
      <button className="close-button" onClick={() => close(null)} aria-label="關閉">×</button>
      <p className="eyebrow">{node.kind.toUpperCase()} / {region.title}</p>
      <h2>{node.title}</h2>
      {node.ticker && <span className="ticker-badge">{node.ticker}</span>}
      <p className="summary">{node.summary}</p>
      <h3>Knowledge fragments</h3>
      <ul>{node.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      <footer>
        <span>來源：{node.sourcePath}</span>
        <span>更新：{node.updatedAt}</span>
      </footer>
    </aside>
  )
}
