import TabsMenu from '../components/TabsMenu'
import { projectsData } from '../data/projectsData'

const PerStatus = () => {
  const statuses = Array.from(new Set(projectsData.map((p) => p.status)))

  return (
    <div>
      <TabsMenu />
      <h2 className="text-xl font-bold mb-4">Projects per Status</h2>
      {statuses.map((s) => {
        const projs = projectsData.filter((p) => p.status === s)
        return (
          <div key={s} className="mb-6">
            <h3 className="font-semibold text-primary mb-2">{s}</h3>
            <ul className="list-disc pl-6 space-y-1">
              {projs.map((p) => (
                <li key={p.id}>{p.title} — {p.department}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default PerStatus
