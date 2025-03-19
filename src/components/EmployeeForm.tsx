import { useParams, useNavigate } from "react-router-dom";
import { Employee } from "../interfaces";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const EmployeeForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [employees, setEmployees] = useState<Array<Employee>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: isEditMode
      ? JSON.parse(localStorage.getItem("employees") || "[]").find(
          (e: Employee) => e.name === id
        )
      : {},
  });

  const onSubmit = async (data: Employee) => {
    let updatedEmployees: Employee[] = [...employees];
    if (isEditMode) {
      updatedEmployees = employees.map((e: Employee) =>
        e.name === id ? data : e
      );
    } else {
      const newEmployee: Employee = { id: findSmallestMissingId(), ...data };
      updatedEmployees.push(newEmployee);
    }
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    navigate("/");
  };
  const findSmallestMissingId = () => {
    const ids = employees
      .map((item) => item.id)
      .filter((id): id is number => id !== undefined)
      .sort((a, b) => a - b);
    let expectedId = 1; // Start checking from 1
    for (const id of ids) {
      if (id !== expectedId) {
        return expectedId; // Return the missing ID
      }
      expectedId++;
    }
    return expectedId;
  };

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees") || "[]"));
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Employee" : "New Employee"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 border rounded"
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("role", { required: "Role is required" })}
          className="w-full p-2 border rounded"
          placeholder="Role"
        />
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        <input
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("phone", { required: "Phone is required" })}
          className="w-full p-2 border rounded"
          placeholder="Phone"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <input
          {...register("address", { required: "Address is required" })}
          className="w-full p-2 border rounded"
          placeholder="Address"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};
