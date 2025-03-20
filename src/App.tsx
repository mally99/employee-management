import React, { useState } from "react";
import "./App.css";
import { AppRoutes } from "./AppRoutes";
import { Moon, Sun } from "lucide-react";
import { strings } from "./assets/strings";

export const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const strs = strings.app;

  const onChangeDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    // Broadcast change to all components
    window.dispatchEvent(new Event("darkModeChange"));
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen`}
    >
      <div className="p-4 flex justify-end">
        <button
          onClick={onChangeDarkMode}
          className="p-2 flex items-center bg-gray-700 text-white rounded-lg hover:bg-gray-600  space-x-2"
        >
          {darkMode ? <Moon size={16} /> : <Sun size={16} />}
          <span>{darkMode ? strs.darkLabel : strs.lightLabel}</span>
        </button>
      </div>
      <AppRoutes />
    </div>
  );
};
