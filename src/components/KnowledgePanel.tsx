import { useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'

export function KnowledgePanel() {
  const node = useGameStore((state) => state.selectedNode)
  const closeNode = useGameStore((state) => state.closeNode)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.code === 'Escape') closeNode()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeNode])

  if (!node) return null

  return (
    <div className="panel-backdrop" onClick={closeNode}>
      <article className="knowledge-panel glass" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={closeNode} aria-label="關閉知識卡片">×</button>
        <p className="eyebrow">{node.category.toUpperCase()} · +{node.xp} XP</p>
        <h2>{node.title}</h2>
        <p className="lead">{node.summary}</p>
        <div className="knowledge-list">
          {node.details.map((detail, index) => (
            <div key={detail}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <footer>
          <span>Prerequisites</span>
          <strong>{node.prerequisites.length ? node.prerequisites.join(' · ') : 'None'}</strong>
        </footer>
      </article>
    </div>
  )
}
