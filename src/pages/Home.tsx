import { useState } from "react";
import TabsMenu from "../components/TabsMenu";
import StatusCards from "../components/StatusCards";
import ProjectsTable from "../components/ProjectsTable";
import { Project } from "../types/Project";
import { projectsData } from "../data/projectsData";

const Home = () => {
  const [filtered, setFiltered] = useState<Project[]>(projectsData);

  const handleFilterChange = (filters: {
    year: string;
    department: string;
    ward: string;
    status: string;
  }) => {
    const newList = projectsData.filter((p) => {
      return (
        (!filters.year || p.financialYear === filters.year) &&
        (!filters.department || p.department === filters.department) &&
        (!filters.ward || p.ward === filters.ward) &&
        (!filters.status || p.status === filters.status)
      );
    });
    setFiltered(newList);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TabsMenu onFilterChange={handleFilterChange} />
      <div className="px-4 sm:px-8 py-6">
        <StatusCards projects={filtered} />
        <ProjectsTable projects={filtered} />
      </div>
    </div>
  );
};

export default Home;
