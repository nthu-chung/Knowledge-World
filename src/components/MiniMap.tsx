import { regions } from '../data/twSupplyChain'
import { useGameStore } from '../store/useGameStore'

const SCALE = 1.18

export function MiniMap() {
  const [x, , z] = useGameStore((state) => state.playerPosition)
  return (
    <div className="minimap" aria-label="世界地圖">
      <div className="minimap-grid" />
      {regions.map((region) => (
        <span
          key={region.id}
          className="minimap-region"
          title={region.title}
          style={{
            left: `calc(50% + ${region.center[0] * SCALE}px)`,
            top: `calc(50% + ${region.center[2] * SCALE}px)`,
            width: `${Math.max(region.radius * 1.1, 8)}px`,
            height: `${Math.max(region.radius * 1.1, 8)}px`,
            borderColor: region.accent,
          }}
        />
      ))}
      <span className="minimap-player" style={{ left: `calc(50% + ${x * SCALE}px)`, top: `calc(50% + ${z * SCALE}px)` }} />
    </div>
  )
}
