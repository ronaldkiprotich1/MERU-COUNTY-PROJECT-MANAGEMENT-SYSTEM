import React from 'react';
import TabsMenu from '../components/TabsMenu';
import { projectsData } from '../data/projectsData';

const PerDepartment: React.FC = () => {
  // 🧠 Get all unique department names
  const departments = Array.from(new Set(projectsData.map((p) => p.department))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <TabsMenu />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Projects per Department
        </h2>

        {departments.map((dept) => {
          // Filter projects by department
          const departmentProjects = projectsData.filter((p) => p.department === dept);

          // 🟡 Skip departments with no projects
          if (departmentProjects.length === 0) return null;

          return (
            <div key={dept} className="mb-8">
              <h3 className="text-lg font-semibold text-blue-700 mb-3 border-l-4 border-blue-600 pl-3">
                {dept}
              </h3>

              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                {departmentProjects.map((p) => (
                  <li key={p.id} className="leading-relaxed">
                    <span className="font-medium">{p.title}</span> —{' '}
                    <span className="italic text-gray-500">{p.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerDepartment;
