import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { knowledgeNodes } from '../data/twSupplyChain'
import { useGameStore } from '../store/useGameStore'

const WALK_SPEED = 7
const RUN_SPEED = 11.5
const GRAVITY = 22
const JUMP_SPEED = 9
const WORLD_LIMIT = 52
const INTERACTION_DISTANCE = 3.1
const BUILDING_CLEARANCE = 1.15

export function Player() {
  const groupRef = useRef<THREE.Group>(null)
  const pressed = useRef<Record<string, boolean>>({})
  const velocityY = useRef(0)
  const grounded = useRef(true)
  const syncTimer = useRef(0)
  const { camera } = useThree()
  const cameraTarget = useMemo(() => new THREE.Vector3(), [])
  const setNearbyNode = useGameStore((state) => state.setNearbyNode)
  const discoverNode = useGameStore((state) => state.discoverNode)
  const setPlayerPosition = useGameStore((state) => state.setPlayerPosition)

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      pressed.current[event.code] = true
      if (event.code === 'Space' && grounded.current) {
        velocityY.current = JUMP_SPEED
        grounded.current = false
      }
      if (event.code === 'KeyE') {
        const nearby = useGameStore.getState().nearbyNode
        if (nearby) discoverNode(nearby)
      }
      if (event.code === 'Escape') useGameStore.getState().selectNode(null)
    }
    const up = (event: KeyboardEvent) => { pressed.current[event.code] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [discoverNode])

  useFrame((_, delta) => {
    const player = groupRef.current
    if (!player) return
    const dt = Math.min(delta, 0.05)
    const input = new THREE.Vector3(
      Number(pressed.current.KeyD || pressed.current.ArrowRight) - Number(pressed.current.KeyA || pressed.current.ArrowLeft),
      0,
      Number(pressed.current.KeyS || pressed.current.ArrowDown) - Number(pressed.current.KeyW || pressed.current.ArrowUp),
    )
    if (input.lengthSq() > 0) {
      input.normalize()
      const speed = pressed.current.ShiftLeft || pressed.current.ShiftRight ? RUN_SPEED : WALK_SPEED
      const candidate = player.position.clone().addScaledVector(input, speed * dt)
      candidate.x = THREE.MathUtils.clamp(candidate.x, -WORLD_LIMIT, WORLD_LIMIT)
      candidate.z = THREE.MathUtils.clamp(candidate.z, -WORLD_LIMIT, WORLD_LIMIT)
      const blocked = knowledgeNodes.some((node) => {
        if (node.kind === 'concept') return false
        const dx = candidate.x - node.position[0]
        const dz = candidate.z - node.position[2]
        const radius = BUILDING_CLEARANCE + node.importance * 0.13
        return dx * dx + dz * dz < radius * radius
      })
      if (!blocked) player.position.copy(candidate)
      player.rotation.y = Math.atan2(input.x, input.z)
    }

    velocityY.current -= GRAVITY * dt
    player.position.y += velocityY.current * dt
    if (player.position.y <= 0.65) {
      player.position.y = 0.65
      velocityY.current = 0
      grounded.current = true
    }

    const desiredCamera = new THREE.Vector3(player.position.x + 8.8, player.position.y + 8.2, player.position.z + 11.5)
    camera.position.lerp(desiredCamera, 1 - Math.pow(0.00045, dt))
    cameraTarget.set(player.position.x, player.position.y + 1.1, player.position.z)
    camera.lookAt(cameraTarget)

    let closest = null
    let distance = Number.POSITIVE_INFINITY
    for (const node of knowledgeNodes) {
      const dx = player.position.x - node.position[0]
      const dz = player.position.z - node.position[2]
      const current = Math.sqrt(dx * dx + dz * dz)
      if (current < INTERACTION_DISTANCE && current < distance) {
        closest = node
        distance = current
      }
    }
    setNearbyNode(closest)

    syncTimer.current += dt
    if (syncTimer.current > 0.12) {
      syncTimer.current = 0
      setPlayerPosition([player.position.x, player.position.y, player.position.z])
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.65, 5]}>
      <mesh castShadow position-y={0.72}>
        <capsuleGeometry args={[0.38, 0.82, 5, 10]} />
        <meshStandardMaterial color="#64dcff" roughness={0.34} metalness={0.18} />
      </mesh>
      <mesh castShadow position-y={1.7}>
        <sphereGeometry args={[0.34, 16, 12]} />
        <meshStandardMaterial color="#f2c8ae" roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.72, 0.31]}>
        <boxGeometry args={[0.32, 0.1, 0.08]} />
        <meshBasicMaterial color="#12263f" />
      </mesh>
      <mesh position={[0, 0.77, -0.39]}>
        <boxGeometry args={[0.66, 0.7, 0.2]} />
        <meshStandardMaterial color="#1b2b52" roughness={0.65} />
      </mesh>
      <pointLight position={[0, 1.4, 0]} intensity={1.1} distance={3.5} color="#55d9ff" />
    </group>
  )
}
