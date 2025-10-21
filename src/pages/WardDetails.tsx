import { useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { Project } from "../types/Project";

const WardDetails = () => {
  const { wardId } = useParams<{ wardId: string }>();

  // Convert URL slug (e.g. "abogeta-west") back to readable ward name
  const wardName = wardId
    ? wardId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  // Filter projects that belong to this ward (case-insensitive)
  const wardProjects = projectsData.filter(
    (p: Project) =>
      p.ward.toLowerCase().replace(/\s+/g, "-") === (wardId ?? "").toLowerCase()
  );

  // Summary statistics
  const total = wardProjects.length;
  const completed = wardProjects.filter((p) => p.status === "Completed").length;
  const ongoing = wardProjects.filter((p) => p.status === "Ongoing").length;
  const pending = wardProjects.filter((p) => p.status === "Pending").length;
  const notStarted = wardProjects.filter(
    (p) => p.status === "Not Started"
  ).length;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* ✅ Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        Projects in {wardName}
      </h2>

      {/* ✅ Summary Section */}
      {wardProjects.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-6 text-sm">
          <div className="text-green-700 font-medium">✅ Completed: {completed}</div>
          <div className="text-blue-600 font-medium">🔄 Ongoing: {ongoing}</div>
          <div className="text-yellow-600 font-medium">⏳ Pending: {pending}</div>
          <div className="text-gray-600 font-medium">🕓 Not Started: {notStarted}</div>
          <div className="text-gray-700 font-medium">📁 Total: {total}</div>
        </div>
      )}

      {/* ❗ No projects message */}
      {wardProjects.length === 0 && (
        <p className="text-gray-500">
          No projects found for <strong>{wardName}</strong>.
        </p>
      )}

      {/* ✅ Projects List */}
      <div className="space-y-4">
        {wardProjects.map((project: Project) => (
          <div
            key={project.id}
            className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Department:</span>{" "}
                  {project.department}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Financial Year:</span>{" "}
                  {project.financialYear}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Contractor:</span>{" "}
                  {project.contractor}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Budget:</span>{" "}
                  Ksh {project.budget.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">{project.description}</p>
              </div>

              {/* ✅ Status badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : project.status === "Ongoing"
                    ? "bg-blue-100 text-blue-700"
                    : project.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* ✅ Details Link */}
            <div className="mt-3 text-right">
              <Link
                to={`/project/${project.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Back link */}
      <div className="mt-8">
        <Link
          to="/per-ward"
          className="text-sm text-gray-600 hover:text-green-700 hover:underline"
        >
          ← Back to all wards
        </Link>
      </div>
    </div>
  );
};

export default WardDetails;
