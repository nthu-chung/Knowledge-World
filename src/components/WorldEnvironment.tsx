import { Grid, Stars } from '@react-three/drei'

export function WorldEnvironment() {
  return (
    <>
      <color attach="background" args={['#050714']} />
      <fog attach="fog" args={['#050714', 18, 44]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        intensity={2.4}
        position={[8, 15, 7]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Stars radius={60} depth={30} count={1800} factor={3} saturation={0.2} fade speed={0.35} />
      <Grid
        args={[34, 34]}
        position={[0, 0, 0]}
        cellSize={1}
        cellThickness={0.55}
        cellColor="#18314f"
        sectionSize={5}
        sectionThickness={1.1}
        sectionColor="#315b84"
        fadeDistance={34}
        fadeStrength={1.5}
        infiniteGrid={false}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#07101d" transparent opacity={0.86} roughness={0.95} />
      </mesh>
    </>
  )
}
