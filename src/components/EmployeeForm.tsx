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
    reset, // Allows us to reset form values
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
        reset(employee); // Update the form with the found employee data
      }
    }
  }, [id, isEditMode, reset]);

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
