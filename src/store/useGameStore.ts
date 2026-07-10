import { create } from 'zustand'
import { mainQuest } from '../data/twSupplyChain'
import type { KnowledgeNodeData } from '../types/knowledge'

interface GameState {
  selectedNode: KnowledgeNodeData | null
  nearbyNode: KnowledgeNodeData | null
  discoveredIds: string[]
  collectedShardIds: string[]
  xp: number
  playerPosition: [number, number, number]
  questIndex: number
  showIntro: boolean
  selectNode: (node: KnowledgeNodeData | null) => void
  setNearbyNode: (node: KnowledgeNodeData | null) => void
  discoverNode: (node: KnowledgeNodeData) => void
  collectShard: (id: string) => void
  setPlayerPosition: (position: [number, number, number]) => void
  dismissIntro: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  selectedNode: null,
  nearbyNode: null,
  discoveredIds: [],
  collectedShardIds: [],
  xp: 0,
  playerPosition: [0, 0.8, 5],
  questIndex: 0,
  showIntro: true,
  selectNode: (node) => set({ selectedNode: node }),
  setNearbyNode: (node) => {
    if (get().nearbyNode?.id !== node?.id) set({ nearbyNode: node })
  },
  discoverNode: (node) => {
    const state = get()
    const alreadyDiscovered = state.discoveredIds.includes(node.id)
    const expected = mainQuest.orderedNodeIds[state.questIndex]
    const questIndex = node.id === expected ? Math.min(state.questIndex + 1, mainQuest.orderedNodeIds.length) : state.questIndex
    set({
      selectedNode: node,
      discoveredIds: alreadyDiscovered ? state.discoveredIds : [...state.discoveredIds, node.id],
      xp: alreadyDiscovered ? state.xp : state.xp + node.xp,
      questIndex,
    })
  },
  collectShard: (id) => {
    const state = get()
    if (state.collectedShardIds.includes(id)) return
    set({ collectedShardIds: [...state.collectedShardIds, id], xp: state.xp + 35 })
  },
  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  dismissIntro: () => set({ showIntro: false }),
}))
