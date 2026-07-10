import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { knowledgeNodes } from '../data/knowledgeGraph'
import { useGameStore } from '../store/useGameStore'

const MOVE_SPEED = 6
const WORLD_LIMIT = 15
const INTERACTION_DISTANCE = 2.8

export function Player() {
  const groupRef = useRef<THREE.Group>(null)
  const pressed = useRef<Record<string, boolean>>({})
  const { camera } = useThree()
  const setNearbyNode = useGameStore((state) => state.setNearbyNode)
  const openNode = useGameStore((state) => state.openNode)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      pressed.current[event.code] = true
      if (event.code === 'KeyE') {
        const nearby = useGameStore.getState().nearbyNode
        if (nearby) openNode(nearby)
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      pressed.current[event.code] = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [openNode])

  useFrame((_, delta) => {
    const player = groupRef.current
    if (!player) return

    const direction = new THREE.Vector3(
      Number(pressed.current.KeyD || pressed.current.ArrowRight) -
        Number(pressed.current.KeyA || pressed.current.ArrowLeft),
      0,
      Number(pressed.current.KeyS || pressed.current.ArrowDown) -
        Number(pressed.current.KeyW || pressed.current.ArrowUp),
    )

    if (direction.lengthSq() > 0) {
      direction.normalize()
      player.position.addScaledVector(direction, MOVE_SPEED * delta)
      player.position.x = THREE.MathUtils.clamp(player.position.x, -WORLD_LIMIT, WORLD_LIMIT)
      player.position.z = THREE.MathUtils.clamp(player.position.z, -WORLD_LIMIT, WORLD_LIMIT)
      player.rotation.y = Math.atan2(direction.x, direction.z)
    }

    const desiredCamera = new THREE.Vector3(
      player.position.x + 7,
      player.position.y + 7,
      player.position.z + 9,
    )
    camera.position.lerp(desiredCamera, 1 - Math.pow(0.001, delta))
    camera.lookAt(player.position.x, player.position.y + 1, player.position.z)

    let closest = null
    let closestDistance = Number.POSITIVE_INFINITY
    for (const node of knowledgeNodes) {
      const nodePosition = new THREE.Vector3(...node.position)
      const distance = player.position.distanceTo(nodePosition)
      if (distance < INTERACTION_DISTANCE && distance < closestDistance) {
        closest = node
        closestDistance = distance
      }
    }
    setNearbyNode(closest)
  })

  return (
    <group ref={groupRef} position={[0, 0.65, 8]}>
      <mesh castShadow position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.38, 0.8, 6, 12]} />
        <meshStandardMaterial color="#77e7ff" roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh castShadow position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#f6cdb6" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 1.7, 0.22]}>
        <boxGeometry args={[0.16, 0.08, 0.08]} />
        <meshStandardMaterial color="#10182b" />
      </mesh>
      <pointLight position={[0, 2.2, 0]} intensity={1.5} distance={4} color="#57d8ff" />
    </group>
  )
}
