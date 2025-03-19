import { useEffect, useState } from "react";
import { mockup } from "../mockup";
import { Pencil, Plus, Trash, Sun, Moon } from "lucide-react";
import { strings } from "../assets/strings";
import { Employee } from "../interfaces";
import { useNavigate } from "react-router-dom";

export const Employees = () => {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const strs = strings.employees;
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      localStorage.setItem("employees", JSON.stringify(mockup));
      setEmployees(mockup);
    }
  }, []);
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

  const onChangeDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold">{strs.title}</h2>

      <div className="flex space-x-4 mb-4">
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

      <div className="grid grid-cols-1 gap-4">
        {employees?.map((employee, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg shadow-md flex justify-between items-center ${
              darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white"
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className={`text-gray-600 ${darkMode ? "text-white" : ""}`}>
                {employee.role}
              </p>
              <p
                className={`text-gray-600 ${darkMode ? "text-white" : ""}`}
              >{`${strs.emailLabel} ${employee.email}`}</p>
              <p
                className={`text-gray-600 ${darkMode ? "text-white" : ""}`}
              >{`${strs.addressLabel} ${employee.address}`}</p>
              <p
                className={`text-gray-600 ${darkMode ? "text-white" : ""}`}
              >{`${strs.phoneLabel} ${employee.phone}`}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(employee.id)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(employee.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
