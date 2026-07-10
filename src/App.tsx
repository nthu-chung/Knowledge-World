import { HUD } from './components/HUD'
import { KnowledgePanel } from './components/KnowledgePanel'
import { KnowledgeWorld } from './components/KnowledgeWorld'
import './styles.css'

export default function App() {
  return (
    <main className="app-shell">
      <KnowledgeWorld />
      <HUD />
      <KnowledgePanel />
    </main>
  )
}
