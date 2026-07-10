import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { knowledgeNodes } from '../data/knowledgeGraph'
import { KnowledgeLinks } from './KnowledgeLinks'
import { KnowledgeNode } from './KnowledgeNode'
import { Player } from './Player'
import { WorldEnvironment } from './WorldEnvironment'

export function KnowledgeWorld() {
  return (
    <Canvas shadows camera={{ position: [7, 8, 17], fov: 52 }} dpr={[1, 1.75]}>
      <Suspense fallback={null}>
        <WorldEnvironment />
        <KnowledgeLinks />
        {knowledgeNodes.map((node) => (
          <KnowledgeNode key={node.id} node={node} />
        ))}
        <Player />
      </Suspense>
    </Canvas>
  )
}
