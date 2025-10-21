import { useState } from "react";
import { projectsData } from "../data/projectsData";

interface FilterProps {
  onFilterChange: (filters: {
    year: string;
    department: string;
    ward: string;
    status: string;
  }) => void;
}

const FilterBar = ({ onFilterChange }: FilterProps) => {
  const years = Array.from(new Set(projectsData.map((p) => p.financialYear))).sort().reverse();
  const departments = Array.from(new Set(projectsData.map((p) => p.department))).sort();
  const wards = Array.from(new Set(projectsData.map((p) => p.ward))).sort();
  const statuses = Array.from(new Set(projectsData.map((p) => p.status))).sort();

  const [filters, setFilters] = useState({ year: "", department: "", ward: "", status: "" });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-6 flex flex-wrap gap-3 items-center justify-between overflow-x-auto">
      {[
        { name: "year", label: "All Years", options: years },
        { name: "department", label: "All Departments", options: departments },
        { name: "ward", label: "All Wards", options: wards },
        { name: "status", label: "All Statuses", options: statuses },
      ].map(({ name, label, options }) => (
        <select
          key={name}
          name={name}
          value={(filters as any)[name]}
          onChange={handleChange}
          className="border rounded-md p-2 min-w-[150px] text-sm"
        >
          <option value="">{label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default FilterBar;
