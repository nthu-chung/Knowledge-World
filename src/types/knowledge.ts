export type NodeKind = 'hub' | 'company' | 'concept'
export type RelationType = 'supply' | 'enables' | 'related' | 'group'

export interface RegionData {
  id: string
  title: string
  subtitle: string
  center: [number, number, number]
  radius: number
  color: string
  accent: string
}

export interface KnowledgeNodeData {
  id: string
  title: string
  aliases?: string[]
  ticker?: string
  summary: string
  details: string[]
  kind: NodeKind
  regionId: string
  position: [number, number, number]
  importance: number
  sourcePath: string
  updatedAt: string
  xp: number
}

export interface KnowledgeEdgeData {
  from: string
  to: string
  relation: RelationType
}

export interface QuestData {
  id: string
  title: string
  description: string
  orderedNodeIds: string[]
  reward: number
}
