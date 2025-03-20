import { Pencil, Trash } from "lucide-react";
import { strings } from "../assets/strings";
import { Employee } from "../interfaces";

export interface IEmployeeDetails {
  employee: Employee;
  darkMode: boolean;
  onEdit: (id?: number) => void;
  onDelete: (id?: number) => void;
}

export const EmployeeDetails = ({
  employee,
  darkMode,
  onDelete,
  onEdit,
}: IEmployeeDetails) => {
  const strs = strings.employeeDetails;

  return (
    <div
      className={`p-4 border rounded-lg shadow-md flex justify-between items-start ${
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
      <div className="flex flex-col">
        <button
          onClick={() => onEdit(employee.id)}
          className={`p-2 rounded-md ${
            darkMode ? "hover:bg-blue-800" : "hover:bg-gray-100"
          } transition-colors duration-200`}
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(employee.id)}
          className={`p-2 rounded-md ${
            darkMode ? "hover:bg-red-800" : "hover:bg-gray-100"
          } transition-colors duration-200`}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};
