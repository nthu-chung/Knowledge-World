import { create } from 'zustand'
import type { KnowledgeNodeData } from '../types/knowledge'

interface GameState {
  selectedNode: KnowledgeNodeData | null
  nearbyNode: KnowledgeNodeData | null
  discoveredIds: string[]
  xp: number
  setNearbyNode: (node: KnowledgeNodeData | null) => void
  openNode: (node: KnowledgeNodeData) => void
  closeNode: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  selectedNode: null,
  nearbyNode: null,
  discoveredIds: [],
  xp: 0,
  setNearbyNode: (node) => set({ nearbyNode: node }),
  openNode: (node) => {
    const discovered = get().discoveredIds.includes(node.id)
    set((state) => ({
      selectedNode: node,
      discoveredIds: discovered ? state.discoveredIds : [...state.discoveredIds, node.id],
      xp: discovered ? state.xp : state.xp + node.xp,
    }))
  },
  closeNode: () => set({ selectedNode: null }),
}))
