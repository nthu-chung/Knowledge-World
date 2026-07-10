import { Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export function WorldEnvironment() {
  const stoneRef = useRef<THREE.InstancedMesh>(null)
  const stones = useMemo(() => {
    const matrix = new THREE.Matrix4()
    const values: THREE.Matrix4[] = []
    for (let i = 0; i < 90; i += 1) {
      const angle = i * 2.399
      const radius = 12 + (i % 11) * 4.2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const scale = 0.25 + (i % 5) * 0.12
      matrix.compose(
        new THREE.Vector3(x, 0.12, z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0)),
        new THREE.Vector3(scale, scale * 0.65, scale),
      )
      values.push(matrix.clone())
    }
    return values
  }, [])

  return (
    <>
      <fog attach="fog" args={['#081121', 42, 105]} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={['#9fd7ff', '#121627', 1.25]} />
      <directionalLight
        castShadow
        position={[24, 35, 14]}
        intensity={2.4}
        color="#fff0d8"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={55}
        shadow-camera-bottom={-55}
      />
      <Stars radius={90} depth={35} count={900} factor={2.5} saturation={0.5} fade speed={0.15} />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.08} receiveShadow>
        <circleGeometry args={[68, 64]} />
        <meshStandardMaterial color="#08101c" roughness={0.95} metalness={0.05} />
      </mesh>
      <gridHelper args={[120, 60, '#19344c', '#101d2b']} position={[0, 0.01, 0]} />
      <instancedMesh
        ref={(mesh) => {
          stoneRef.current = mesh
          if (!mesh) return
          stones.forEach((value, index) => mesh.setMatrixAt(index, value))
          mesh.instanceMatrix.needsUpdate = true
        }}
        args={[undefined, undefined, stones.length]}
        castShadow
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#17283a" roughness={0.9} flatShading />
      </instancedMesh>
    </>
  )
}
