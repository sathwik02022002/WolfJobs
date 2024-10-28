import { render, screen } from "@testing-library/react";
import React from "react";
import ProtectedRoute from "../../../src/components/ProtectedRoute/ProtectedRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    // Clear local storage for each test
    localStorage.removeItem("token");
  });

  it("renders child component if token is present", () => {
    // Directly set a token in localStorage to simulate an authenticated user
    localStorage.setItem("token", "mockToken");

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Verify that the protected content is displayed
    const protectedContent = screen.getByText("Protected Content");
    if (!protectedContent) {
      throw new Error("Protected content was not rendered");
    }
  });

  it("redirects to login if no token is present", () => {
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Check that the page displays the login text instead of protected content
    const loginPageContent = screen.getByText("Login Page");
    if (!loginPageContent) {
      throw new Error("Redirection to login page failed");
    }
  });
});
