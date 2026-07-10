import { KnowledgePanel } from './components/KnowledgePanel'
import { KnowledgeWorld } from './components/KnowledgeWorld'
import { HUD } from './components/HUD'
import { MiniMap } from './components/MiniMap'
import './styles.css'

export default function App() {
  return (
    <main className="app-shell">
      <KnowledgeWorld />
      <HUD />
      <MiniMap />
      <KnowledgePanel />
    </main>
  )
}
