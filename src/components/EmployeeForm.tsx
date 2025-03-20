import { useParams, useNavigate } from "react-router-dom";
import { Employee } from "../interfaces";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { strings } from "../assets/strings";

export const EmployeeForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const strs = strings.employeeForm;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Employee>();

  useEffect(() => {
    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(storedEmployees);

    if (isEditMode) {
      const employee = storedEmployees.find(
        (e: Employee) => e.id?.toString() === id
      );
      if (employee) {
        reset(employee);
      }
    }
  }, [id, isEditMode, reset]);

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

  const findSmallestMissingId = () => {
    const ids = employees
      .map((item) => item.id)
      .filter((id): id is number => id !== undefined)
      .sort((a, b) => a - b);
    let expectedId = 1;
    for (const id of ids) {
      if (id !== expectedId) return expectedId;
      expectedId++;
    }
    return expectedId;
  };

  const onSubmit = (data: Employee) => {
    let updatedEmployees: Employee[];

    if (isEditMode) {
      updatedEmployees = employees.map((e) =>
        e.id?.toString() === id ? { ...e, ...data } : e
      );
    } else {
      const newEmployee: Employee = { id: findSmallestMissingId(), ...data };
      updatedEmployees = [...employees, newEmployee];
    }

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    navigate("/");
  };

  return (
    <div
      className={`p-6 max-w-lg mx-auto min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Employee" : "New Employee"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: strs.nameRequired })}
          className={`w-full p-2 border rounded ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white border-gray-300"
          }`}
          placeholder={strs.nameLabel}
        />
        {errors.name && <p className="text-red-400">{errors.name.message}</p>}

        <input
          {...register("role", { required: strs.roleRequired })}
          className={`w-full p-2 border rounded ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white border-gray-300"
          }`}
          placeholder={strs.roleLabel}
        />
        {errors.role && <p className="text-red-400">{errors.role.message}</p>}

        <input
          {...register("email", {
            required: strs.emailRequired,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: strs.invalidEmail,
            },
          })}
          className={`w-full p-2 border rounded ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white border-gray-300"
          }`}
          placeholder={strs.emailLabel}
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}

        <input
          {...register("phone", {
            required: strs.phoneRequired,
            pattern: {
              value: /^((\+972|0)([23489]|5[0-9])[- ]?\d{7})$/,
              message: strs.invalidphone,
            },
          })}
          className={`w-full p-2 border rounded ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white border-gray-300"
          }`}
          placeholder={strs.phoneLabel}
        />
        {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}

        <input
          {...register("address", { required: strs.addressRequired })}
          className={`w-full p-2 border rounded ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white border-gray-300"
          }`}
          placeholder={strs.addressLabel}
        />
        {errors.address && (
          <p className="text-red-400">{errors.address.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {strs.save}
        </button>
      </form>
    </div>
  );
};
