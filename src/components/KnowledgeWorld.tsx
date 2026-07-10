import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { DataShards } from './DataShards'
import { Districts } from './Districts'
import { Player } from './Player'
import { SupplyChainLinks } from './SupplyChainLinks'
import { WorldEnvironment } from './WorldEnvironment'

export function KnowledgeWorld() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.45]}
      camera={{ position: [10, 12, 15], fov: 52, near: 0.1, far: 180 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#050816')}
    >
      <Suspense fallback={null}>
        <WorldEnvironment />
        <Districts />
        <SupplyChainLinks />
        <DataShards />
        <Player />
      </Suspense>
    </Canvas>
  )
}
