import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { regionById } from '../data/twSupplyChain'
import { useGameStore } from '../store/useGameStore'
import type { KnowledgeNodeData } from '../types/knowledge'

export function KnowledgeBuilding({ node }: { node: KnowledgeNodeData }) {
  const glowRef = useRef<THREE.Mesh>(null)
  const nearbyId = useGameStore((state) => state.nearbyNode?.id)
  const selectedId = useGameStore((state) => state.selectedNode?.id)
  const discovered = useGameStore((state) => state.discoveredIds.includes(node.id))
  const active = nearbyId === node.id || selectedId === node.id
  const region = regionById.get(node.regionId)!
  const height = node.kind === 'hub' ? 6.5 : node.kind === 'concept' ? 3.8 + node.importance * 0.15 : 2 + node.importance * 0.62
  const width = node.kind === 'hub' ? 2.8 : node.kind === 'concept' ? 1.25 : 1.35 + node.importance * 0.12

  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.2 + node.position[0]) * 0.08
    glowRef.current.scale.setScalar(active ? pulse * 1.25 : pulse)
    glowRef.current.rotation.y += 0.004
  })

  if (node.kind === 'concept') {
    return (
      <group position={node.position}>
        <mesh castShadow position-y={height * 0.5} rotation-y={Math.PI / 4}>
          <octahedronGeometry args={[width, 0]} />
          <meshStandardMaterial color={region.color} emissive={region.accent} emissiveIntensity={active ? 1.4 : 0.45} roughness={0.35} metalness={0.5} flatShading />
        </mesh>
        <mesh ref={glowRef} position-y={height * 0.5}>
          <torusGeometry args={[width * 1.35, 0.055, 6, 20]} />
          <meshBasicMaterial color={region.accent} transparent opacity={active ? 0.95 : 0.42} />
        </mesh>
        {active && <NodeLabel node={node} color={region.accent} y={height + 0.9} />}
      </group>
    )
  }

  return (
    <group position={node.position}>
      <mesh castShadow receiveShadow position-y={height * 0.5}>
        {node.kind === 'hub' ? <cylinderGeometry args={[width * 0.72, width, height, 8]} /> : <boxGeometry args={[width, height, width]} />}
        <meshStandardMaterial color={discovered ? region.accent : region.color} emissive={region.accent} emissiveIntensity={active ? 0.7 : discovered ? 0.18 : 0.08} roughness={0.56} metalness={0.3} flatShading />
      </mesh>
      <mesh ref={glowRef} position-y={height + 0.25}>
        <torusGeometry args={[width * 0.68, 0.06, 6, 20]} />
        <meshBasicMaterial color={region.accent} transparent opacity={active ? 0.95 : 0.28} />
      </mesh>
      {node.ticker && (
        <Text position={[0, height * 0.64, width * 0.51]} fontSize={0.27} color="#eff8ff" anchorX="center" outlineWidth={0.02} outlineColor="#08111e">
          {node.ticker}
        </Text>
      )}
      {active && <NodeLabel node={node} color={region.accent} y={height + 1.05} />}
    </group>
  )
}

function NodeLabel({ node, color, y }: { node: KnowledgeNodeData; color: string; y: number }) {
  return (
    <group position-y={y}>
      <Text fontSize={0.48} color={color} anchorX="center" anchorY="middle" outlineWidth={0.035} outlineColor="#050914">
        {node.title}
      </Text>
      {node.ticker && <Text position-y={-0.48} fontSize={0.23} color="#d3deed" anchorX="center">{node.ticker}</Text>}
    </group>
  )
}
