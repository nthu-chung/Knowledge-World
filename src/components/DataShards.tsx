import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore } from '../store/useGameStore'

interface Shard {
  id: string
  position: [number, number, number]
}

function ShardItem({ shard }: { shard: Shard }) {
  const ref = useRef<THREE.Mesh>(null)
  const player = useGameStore((state) => state.playerPosition)
  const collected = useGameStore((state) => state.collectedShardIds.includes(shard.id))
  const collect = useGameStore((state) => state.collectShard)
  useFrame(({ clock }) => {
    if (!ref.current || collected) return
    ref.current.rotation.y += 0.02
    ref.current.position.y = shard.position[1] + Math.sin(clock.elapsedTime * 2.2 + shard.position[0]) * 0.2
    const dx = player[0] - shard.position[0]
    const dz = player[2] - shard.position[2]
    if (dx * dx + dz * dz < 1.7) collect(shard.id)
  })
  if (collected) return null
  return (
    <mesh ref={ref} position={shard.position}>
      <octahedronGeometry args={[0.32, 0]} />
      <meshStandardMaterial color="#ecfbff" emissive="#58d7ff" emissiveIntensity={1.5} roughness={0.18} metalness={0.7} />
      <pointLight intensity={0.65} distance={2.2} color="#5ddcff" />
    </mesh>
  )
}

export function DataShards() {
  const shards = useMemo<Shard[]>(() => Array.from({ length: 24 }, (_, index) => {
    const angle = index * 2.399
    const radius = 8 + (index % 6) * 7.2
    return { id: `shard-${index}`, position: [Math.cos(angle) * radius, 1.25, Math.sin(angle) * radius] }
  }), [])
  return <>{shards.map((shard) => <ShardItem key={shard.id} shard={shard} />)}</>
}
