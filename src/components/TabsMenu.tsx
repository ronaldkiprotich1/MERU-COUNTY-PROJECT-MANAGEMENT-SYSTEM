import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const TabsMenu = ({ onFilterChange }: { onFilterChange?: (filters: any) => void }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    year: "",
    status: "",
    department: "",
    ward: "",
  });

  // ✅ Dropdown options
  const dropdownOptions: Record<string, string[]> = {
    year: [
      "All Financial Years",
      "2024/2025",
      "2023/2024",
      "2022/2023",
      "2021/2022",
    ],
    status: ["All Statuses", "Completed", "Ongoing", "Pending", "Not Started"],
    department: [
      "All Departments",
      "Trade & Cooperatives",
      "Health Services",
      "Education",
      "Water & Sanitation",
      "Infrastructure",
      "ICT & Youth Affairs",
      "Emergency Services",
      "Agriculture & Livestock",
      "Environment & Urban Planning",
      "Gender & Social Services",
      "Energy & Infrastructure",
    ],
    ward: [
      "All Wards",
      "Maua",
      "Kiegoi/Antubochiu",
      "Akachiu",
      "Athiru Gaiti",
      "Njia",
      "Amwathi",
      "Antuambui",
      "Mituntu",
      "Muthara",
      "Kiengu",
      "Nkomo",
      "Athinga/Athanja",
      "Kibirichia",
      "Kiirua/Naari",
      "Ntima East",
      "Ntima West",
      "Abothuguchi Central",
      "Abothuguchi West",
      "Mikinduri",
      "Karingani",
      "Mitheru",
      "Magumoni",
      "Mugwe",
      "Chogoria",
      "Nkubu",
      "Abogeta West",
      "Abogeta East",
      "Igoji East",
      "Igoji West",
      "Kanyakine",
      "Timau",
      "Ruiri/Rwarera",
      "Buuri",
      "Imenti North",
      "Imenti South",
      "Tigania East",
      "Tigania West",
      "Igembe North",
      "Igembe South",
      "Igembe Central",
      "Ntonyiri",
      "Antubetwe Kiongo",
      "Athiru Ruujine",
    ],
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown
  const toggleDropdown = (tab: string) => {
    setActiveTab(tab);
    setOpenDropdown(openDropdown === tab ? null : tab);
    setSearchTerm("");
  };

  // ✅ Handle selection
  const handleSelect = (tab: string, option: string) => {
    const newFilters = {
      ...filters,
      [tab]:
        option.startsWith("All") || option.startsWith("FY") ? "" : option,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
    setOpenDropdown(null);
    setSearchTerm("");
  };

  // ✅ Enable scrolling on laptops and external mice
  useEffect(() => {
    const dropdownEl = dropdownRef.current;
    if (dropdownEl) {
      dropdownEl.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
    }
  }, []);

  // ✅ Filter search for wards
  const filteredOptions = (tabId: string) => {
    const options = dropdownOptions[tabId];
    if (!options) return [];
    if (tabId !== "ward") return options;
    return options.filter((w) =>
      w.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const tabs = [
    { id: "all", label: "All Projects" },
    { id: "year", label: "Per Financial Year" },
    { id: "status", label: "Per Status" },
    { id: "department", label: "Per Department" },
    { id: "ward", label: "Per Ward" },
  ];

  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="flex flex-wrap justify-center sm:justify-evenly items-center px-2 sm:px-6 py-3 text-sm font-medium gap-3 sm:gap-6">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative" ref={dropdownRef}>
            <button
              onClick={() =>
                tab.id === "all" ? onFilterChange?.({}) : toggleDropdown(tab.id)
              }
              className={`flex items-center gap-1 transition ${
                activeTab === tab.id
                  ? "text-green-700 font-semibold"
                  : "text-blue-700 hover:text-green-700"
              }`}
            >
              {tab.label}
              {dropdownOptions[tab.id] && (
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    openDropdown === tab.id ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* ✅ Dropdown menu */}
            <AnimatePresence>
              {openDropdown === tab.id && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-60 max-h-72 overflow-y-auto bg-blue-600 text-white rounded-md shadow-lg z-50 scroll-smooth"
                >
                  {tab.id === "ward" && (
                    <div className="sticky top-0 bg-blue-700 flex items-center px-3 py-2 border-b border-blue-400">
                      <Search size={16} className="text-white mr-2" />
                      <input
                        type="text"
                        placeholder="Search ward..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-blue-700 text-white text-sm focus:outline-none placeholder-gray-200"
                      />
                    </div>
                  )}

                  {filteredOptions(tab.id).map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 text-sm hover:bg-green-600 cursor-pointer border-b border-blue-400 last:border-none"
                      onClick={() => handleSelect(tab.id, option)}
                    >
                      {option}
                    </div>
                  ))}

                  {tab.id === "ward" && filteredOptions(tab.id).length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-200 italic">
                      No wards found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default TabsMenu;
