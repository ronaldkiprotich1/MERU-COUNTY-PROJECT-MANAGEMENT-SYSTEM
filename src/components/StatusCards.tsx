import { Project } from "../types/Project";

interface StatusCardsProps {
  projects: Project[];
}

const StatusCards = ({ projects }: StatusCardsProps) => {
  const completed = projects.filter((p) => p.status === "Completed").length;
  const ongoing = projects.filter((p) => p.status === "Ongoing").length;
  const pending = projects.filter((p) => p.status === "Pending").length;
  const notStarted = projects.filter((p) => p.status === "Not Started").length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalProjects = projects.length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-4 px-3 select-none cursor-default">
      <div className="bg-green-600 text-white text-center p-4 rounded-lg shadow-sm">
        <p className="text-2xl sm:text-3xl font-bold">{completed}</p>
        <p className="text-xs sm:text-sm">Completed</p>
      </div>
      <div className="bg-blue-600 text-white text-center p-4 rounded-lg shadow-sm">
        <p className="text-2xl sm:text-3xl font-bold">{ongoing}</p>
        <p className="text-xs sm:text-sm">Ongoing</p>
      </div>
      <div className="bg-yellow-500 text-white text-center p-4 rounded-lg shadow-sm">
        <p className="text-2xl sm:text-3xl font-bold">{pending}</p>
        <p className="text-xs sm:text-sm">Pending</p>
      </div>
      <div className="bg-gray-500 text-white text-center p-4 rounded-lg shadow-sm">
        <p className="text-2xl sm:text-3xl font-bold">{notStarted}</p>
        <p className="text-xs sm:text-sm">Not Started</p>
      </div>
      <div className="bg-white border text-center p-4 rounded-lg shadow-sm">
        <p className="text-2xl sm:text-3xl font-bold text-blue-700">{totalProjects}</p>
        <p className="text-xs sm:text-sm text-gray-700">Total Projects</p>
        <p className="text-green-700 text-xs sm:text-sm font-medium mt-1">
          KES {totalBudget.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default StatusCards;
