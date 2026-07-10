import { Text } from '@react-three/drei'
import { knowledgeNodes, regions } from '../data/twSupplyChain'
import { KnowledgeBuilding } from './KnowledgeBuilding'

function DistrictPlatform({ region }: { region: (typeof regions)[number] }) {
  const isCore = region.id === 'core'
  return (
    <group position={region.center}>
      <mesh receiveShadow position-y={0.12}>
        <cylinderGeometry args={[region.radius, region.radius * 1.04, 0.35, isCore ? 32 : 20]} />
        <meshStandardMaterial color={region.color} roughness={0.82} metalness={0.12} flatShading />
      </mesh>
      <mesh position-y={0.32}>
        <torusGeometry args={[region.radius * 0.82, 0.065, 5, isCore ? 40 : 24]} />
        <meshBasicMaterial color={region.accent} transparent opacity={0.62} />
      </mesh>
      <Text position={[0, 2.6, -region.radius * 0.15]} fontSize={isCore ? 1.05 : 0.75} color={region.accent} anchorX="center" anchorY="middle" outlineWidth={0.035} outlineColor="#07101d">
        {region.title}
      </Text>
      {!isCore && (
        <Text position={[0, 1.75, -region.radius * 0.15]} fontSize={0.28} color="#c7d4e7" anchorX="center">
          {region.subtitle}
        </Text>
      )}
    </group>
  )
}

function Bridge({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const dx = to[0] - from[0]
  const dz = to[2] - from[2]
  const length = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(dz, dx)
  return (
    <group position={[(from[0] + to[0]) / 2, 0.12, (from[2] + to[2]) / 2]} rotation-y={-angle}>
      <mesh receiveShadow>
        <boxGeometry args={[length, 0.18, 1.5]} />
        <meshStandardMaterial color="#172334" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[length, 0.025, 0.08]} />
        <meshBasicMaterial color="#5ca4d9" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

export function Districts() {
  const core = regions.find((region) => region.id === 'core')!
  return (
    <>
      {regions.filter((region) => region.id !== 'core').map((region) => (
        <Bridge key={region.id} from={core.center} to={region.center} />
      ))}
      {regions.map((region) => <DistrictPlatform key={region.id} region={region} />)}
      {knowledgeNodes.map((node) => <KnowledgeBuilding key={node.id} node={node} />)}
    </>
  )
}
