import { Float, Html } from '@react-three/drei'
import { useGameStore } from '../store/useGameStore'
import type { KnowledgeCategory, KnowledgeNodeData } from '../types/knowledge'

const colors: Record<KnowledgeCategory, string> = {
  foundation: '#53d6ff',
  model: '#9f7aea',
  application: '#ffb84d',
  frontier: '#ff5da2',
}

export function KnowledgeNode({ node }: { node: KnowledgeNodeData }) {
  const discovered = useGameStore((state) => state.discoveredIds.includes(node.id))
  const nearby = useGameStore((state) => state.nearbyNode?.id === node.id)
  const color = colors[node.category]

  return (
    <group position={node.position}>
      <Float speed={2} rotationIntensity={0.45} floatIntensity={0.55}>
        <mesh castShadow>
          <octahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={nearby ? 2.1 : discovered ? 1.25 : 0.65}
            roughness={0.22}
            metalness={0.45}
          />
        </mesh>
        <pointLight intensity={nearby ? 7 : 3} distance={5} color={color} />
      </Float>
      <Html center position={[0, 1.25, 0]} distanceFactor={13} occlude>
        <div className={`node-label ${discovered ? 'is-discovered' : ''}`}>
          <strong>{node.title}</strong>
          <span>{discovered ? '已發現' : `${node.xp} XP`}</span>
        </div>
      </Html>
    </group>
  )
}
