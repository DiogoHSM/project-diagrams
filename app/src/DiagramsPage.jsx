import { useMemo, useState } from 'react'
import './DiagramsPage.css'
import Map6OneDiagram from './SocialMediaArch.jsx'
import Map6ProDiagram from './SocialMediaArchPro.jsx'
import Map6UltraDiagram from './SocialMediaArchUltra.jsx'

export default function DiagramsPage() {
  const diagrams = useMemo(
    () => [
      {
        id: 'map6-one',
        label: 'Map6 ONE',
        description: 'Baseline architecture',
        Component: Map6OneDiagram,
      },
      {
        id: 'map6-pro',
        label: 'Map6 PRO',
        description: 'Pro variation',
        Component: Map6ProDiagram,
      },
      {
        id: 'map6-ultra',
        label: 'Map6 ULTRA',
        description: 'Ultra variation',
        Component: Map6UltraDiagram,
      },
    ],
    [],
  )

  const [selectedId, setSelectedId] = useState(diagrams[0].id)
  const selected = diagrams.find((d) => d.id === selectedId) ?? diagrams[0]
  const SelectedComponent = selected.Component

  return (
    <section className="diagrams-page">
      <aside className="diagrams-menu">
        <h2 className="diagrams-menu-title">Diagrams</h2>
        <p className="diagrams-menu-subtitle">Select a diagram to open</p>

        <nav className="diagrams-nav" aria-label="Diagram list">
          {diagrams.map((diagram) => {
            const isActive = selectedId === diagram.id
            return (
              <button
                key={diagram.id}
                type="button"
                className={`diagrams-nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setSelectedId(diagram.id)}
              >
                <span className="diagrams-nav-item-title">{diagram.label}</span>
                <span className="diagrams-nav-item-desc">{diagram.description}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <div className="diagrams-canvas">
        <SelectedComponent />
      </div>
    </section>
  )
}
