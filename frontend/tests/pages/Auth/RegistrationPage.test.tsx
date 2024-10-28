import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";

// Mock `useNavigate` for testing the cancel button functionality
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

describe("RegistrationPage", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders RegistrationPage with required fields", () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Basic field presence checks
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Skills/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
  });

  it("renders the sign-up and cancel buttons", () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Check for the presence of Sign up and Cancel buttons
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("navigates back when 'Cancel' button is clicked", () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Simulate a click on the "Cancel" button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Verify that navigate was called with -1
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });


  it("displays email format validation error for invalid email", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email Id/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Sign up"));

    await waitFor(() => {
      expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    });
  });

  // it("shows validation error if passwords do not match", async () => {
  //   render(
  //     <MemoryRouter>
  //       <RegistrationPage />
  //     </MemoryRouter>
  //   );

  //   fireEvent.change(screen.getByLabelText(/Password/i), {
  //     target: { value: "password123" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Confirm password/i), {
  //     target: { value: "differentPassword" },
  //   });
  //   fireEvent.click(screen.getByText("Sign up"));

  //   await waitFor(() => {
  //     expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
  //   });
  // });

  it("renders 'Affiliation' field when 'Manager' role is selected", () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    fireEvent.mouseDown(screen.getByLabelText(/Role/i));
    fireEvent.click(screen.getByText("Manager"));

    expect(screen.getByLabelText(/Affiliation/i)).toBeInTheDocument();
  });
});