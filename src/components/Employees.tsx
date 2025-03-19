import { useEffect, useState } from "react";
import { mockup } from "../mockup";
import { Pencil, Plus, Trash } from "lucide-react";
import { strings } from "../assets/strings";
import { Employee } from "../interfaces";
import { useNavigate } from "react-router-dom";

export const Employees = () => {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const strs = strings.employees;
  const navigate = useNavigate();

  // Load employees from localStorage when component mounts
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      localStorage.setItem("employees", JSON.stringify(mockup));
      setEmployees(mockup);
    }
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
  const addEmployee = () => navigate("/create");

  const editEmployee = (id?: number) => id && navigate("/edit/" + id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{strs.title}</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={sortEmployees}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          {`${strs.sortLabel} ${sortOrder}`}
        </button>
        <button
          onClick={addEmployee}
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
            className="p-4 border rounded-lg shadow-md bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className="text-gray-600">{employee.role}</p>
              <p className="text-gray-500">
                {`${strs.emailLabel} ${employee.email}`}
              </p>
              <p className="text-gray-500">{`${employee.address} ${employee.address}`}</p>
              <p className="text-gray-500">
                {`${employee.phone} ${employee.phone}`}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => editEmployee(employee.id)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Pencil size={16} />
              </button>
              <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
