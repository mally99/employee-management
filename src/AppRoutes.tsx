import { Routes, Route } from "react-router-dom";
import { Employees } from "./components/Employees";
import { EmployeeForm } from "./components/EmployeeForm";
import { BrowserRouter as Router } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/create" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
        <Route path="*" element={<Employees />} />
      </Routes>
    </Router>
  );
};
