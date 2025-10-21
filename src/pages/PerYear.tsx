import TabsMenu from '../components/TabsMenu'
import { projectsData } from '../data/projectsData'

const PerYear = () => {
  const years = Array.from(new Set(projectsData.map((p) => p.financialYear)))

  return (
    <div>
      <TabsMenu />
      <h2 className="text-xl font-bold mb-4">Projects per Financial Year</h2>
      {years.map((y) => {
        const projs = projectsData.filter((p) => p.financialYear === y)
        return (
          <div key={y} className="mb-6">
            <h3 className="font-semibold text-primary mb-2">{y}</h3>
            <ul className="list-disc pl-6 space-y-1">
              {projs.map((p) => (
                <li key={p.id}>{p.title} — <span className="text-gray-600">{p.department}</span></li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default PerYear
