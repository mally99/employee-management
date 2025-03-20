import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { strings } from "./assets/strings";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock AppRoutes
jest.mock("./AppRoutes", () => ({
  AppRoutes: () => <div data-testid="app-routes">Mock AppRoutes</div>,
}));

describe("App Component", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("display in default button in light mode", () => {
    render(<App />);
    expect(screen.getByText(strings.app.lightLabel)).toBeInTheDocument();
    expect(screen.getByTestId("app-routes")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("bg-gray-700");
    expect(screen.getByRole("button")).toHaveClass("text-white");
    expect(screen.getByRole("button")).toHaveClass("rounded-lg");
  });

  it("renders correctly in dark mode button if localStorage is set", () => {
    localStorageMock.setItem("theme", "dark");
    render(<App />);
    expect(screen.getByText(strings.app.darkLabel)).toBeInTheDocument();
  });
});
