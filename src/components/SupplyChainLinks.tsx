import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { knowledgeEdges, nodeById } from '../data/twSupplyChain'

const relationColors = {
  supply: '#54d6ff',
  enables: '#8fffb4',
  related: '#c4a3ff',
  group: '#5c7896',
}

const keyRoute = ['ic-design', 'tsmc', 'advanced-packaging', 'memory-dram-hbm', 'ai-server-odm', 'server-cooling', 'high-speed-interconnect']

function FlowOrb() {
  const ref = useRef<THREE.Mesh>(null)
  const points = useMemo(() => keyRoute.map((id) => new THREE.Vector3(...nodeById.get(id)!.position)), [])
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.25), [points])
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.copy(curve.getPoint((clock.elapsedTime * 0.035) % 1))
  })
  return (
    <mesh ref={ref} position-y={1.2}>
      <sphereGeometry args={[0.22, 10, 10]} />
      <meshBasicMaterial color="#dffcff" />
      <pointLight intensity={1.4} distance={4} color="#59dcff" />
    </mesh>
  )
}

export function SupplyChainLinks() {
  return (
    <>
      {knowledgeEdges.map((edge, index) => {
        const from = nodeById.get(edge.from)
        const to = nodeById.get(edge.to)
        if (!from || !to) return null
        return (
          <Line
            key={`${edge.from}-${edge.to}-${index}`}
            points={[[from.position[0], 0.48, from.position[2]], [to.position[0], 0.48, to.position[2]]]}
            color={relationColors[edge.relation]}
            lineWidth={edge.relation === 'group' ? 0.45 : 0.85}
            transparent
            opacity={edge.relation === 'group' ? 0.18 : 0.42}
          />
        )
      })}
      <FlowOrb />
    </>
  )
}
