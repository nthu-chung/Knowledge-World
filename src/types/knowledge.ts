export type KnowledgeCategory = 'foundation' | 'model' | 'application' | 'frontier'

export interface KnowledgeNodeData {
  id: string
  title: string
  summary: string
  details: string[]
  category: KnowledgeCategory
  position: [number, number, number]
  prerequisites: string[]
  xp: number
}

export interface KnowledgeEdgeData {
  from: string
  to: string
}
