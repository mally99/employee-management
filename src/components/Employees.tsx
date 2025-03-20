import { useEffect, useState } from "react";
import { mockup } from "../mockup";
import { Pencil, Plus, Trash, Sun, Moon } from "lucide-react";
import { strings } from "../assets/strings";
import { Employee } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { EmployeeDetails } from "./EmployeeDetails";

export const Employees = () => {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Array<Employee>>(
    []
  );

  const strs = strings.employees;
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
      setFilteredEmployees(JSON.parse(storedEmployees));
    } else {
      localStorage.setItem("employees", JSON.stringify(mockup));
      setEmployees(mockup);
      setFilteredEmployees(mockup);
    }
  }, []);
  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employees]);
  // Listen for dark mode changes
  useEffect(() => {
    const handleDarkModeChange = () => {
      setDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("darkModeChange", handleDarkModeChange);

    return () => {
      window.removeEventListener("darkModeChange", handleDarkModeChange);
    };
  }, []);
  const sortEmployees = () => {
    const sorted = [...employees].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setEmployees(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const onAdd = () => navigate("/create");

  const onEdit = (id?: number) => id && navigate("/edit/" + id);

  const onDelete = (id?: number) => {
    if (!id) return;
    const filteredEmployees = employees.filter((e) => e.id !== id);
    setEmployees(filteredEmployees);
    localStorage.setItem("employees", JSON.stringify(filteredEmployees));
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold">{strs.title}</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder={strs.searchLabel}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <button
          onClick={sortEmployees}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          {`${strs.sortLabel} ${sortOrder}`}
        </button>
        <button
          onClick={onAdd}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>{strs.addLabel}</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredEmployees.map((employee, index) => (
          <EmployeeDetails
            key={index}
            employee={employee}
            darkMode={darkMode}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
