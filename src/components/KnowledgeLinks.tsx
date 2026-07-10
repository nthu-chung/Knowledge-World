import * as THREE from 'three'
import { knowledgeEdges, knowledgeNodes } from '../data/knowledgeGraph'

export function KnowledgeLinks() {
  const nodeMap = new Map(knowledgeNodes.map((node) => [node.id, node]))

  return (
    <group>
      {knowledgeEdges.map((edge) => {
        const from = nodeMap.get(edge.from)
        const to = nodeMap.get(edge.to)
        if (!from || !to) return null

        const start = new THREE.Vector3(...from.position)
        const end = new THREE.Vector3(...to.position)
        const midpoint = start.clone().add(end).multiplyScalar(0.5)
        const length = start.distanceTo(end)
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          end.clone().sub(start).normalize(),
        )

        return (
          <mesh key={`${edge.from}-${edge.to}`} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.025, 0.025, length, 6]} />
            <meshBasicMaterial color="#4f6f9c" transparent opacity={0.55} />
          </mesh>
        )
      })}
    </group>
  )
}
