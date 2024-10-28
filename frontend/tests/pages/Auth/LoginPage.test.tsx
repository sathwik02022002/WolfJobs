import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import LoginPage from "../../../src/Pages/Auth/LoginPage";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { vi } from "vitest";
import { login } from "../../../src/deprecateded/auth";

// Mock axios and login requests
vi.mock("axios");
vi.mock("../../../src/deprecateded/auth", () => ({
  login: vi.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedLogin = login as jest.Mock;

describe("LoginPage - Simple Tests with OTP", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedAxios.post = vi.fn();
  });

  // Test 1: Renders the LoginPage component
  it("renders LoginPage with essential elements", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email Id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  // Test 2: Shows validation error when email is empty
  it("shows email validation error when empty", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Login"));
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  // Test 3: Shows validation error when password is empty
  it("shows password validation error when empty", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Login"));
    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  // Test 4: Displays email format error for invalid email
  it("shows email format error when email is invalid", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email Id/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Email format is not valid")).toBeInTheDocument();
    });
  });

  // Test 5: Allows valid email format without errors
  it("accepts a valid email format", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.queryByText("Email format is not valid")).not.toBeInTheDocument();
    });
  });

  // Test 6: Allows typing in password field
  it("accepts input in the password field", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const passwordField = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordField, { target: { value: "password123" } });
    expect(passwordField).toHaveValue("password123");
  });

  // Test 7: Displays login failure message when login fails
  it("displays login failure message when incorrect credentials are used", async () => {
    (mockedAxios.post as jest.Mock).mockResolvedValueOnce({
      data: { success: false },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Login failed, please try again.")).toBeInTheDocument();
    });
  });

  // Test 8: Displays "Remember me" checkbox
  it("renders a 'Remember me' checkbox", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const rememberMeCheckbox = screen.getByLabelText("Remember me");
    expect(rememberMeCheckbox).toBeInTheDocument();
    expect(rememberMeCheckbox).not.toBeChecked();
  });

  // Test 9: Allows toggling "Remember me" checkbox
  it("allows toggling the 'Remember me' checkbox", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const rememberMeCheckbox = screen.getByLabelText("Remember me");
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });

  // Test 10: Renders form submit button with correct styling
  it("renders login button with correct styling", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveStyle({
      background: "#FF5353",
      borderRadius: "10px",
      textTransform: "none",
      fontSize: "16px",
    });
  });

  // OTP Tests

  // Test 11: Renders OTP input upon successful login
  // it("renders OTP input upon successful login", async () => {
  //   // Mock a successful login response
  //   mockedLogin.mockResolvedValueOnce({
  //     success: true,
  //     userId: "testUserId",
  //   });
  //   // Mock a successful OTP email send response
  //   mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

  //   render(
  //     <MemoryRouter>
  //       <LoginPage />
  //     </MemoryRouter>
  //   );

  //   // Simulate entering email and password
  //   fireEvent.change(screen.getByLabelText(/Email Id/i), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Password/i), {
  //     target: { value: "password123" },
  //   });

  //   // Submit login form
  //   fireEvent.click(screen.getByText("Login"));

  //   // Wait for OTP input to appear after successful login
  //   await waitFor(() => {
  //     expect(screen.getByText("Enter OTP")).toBeInTheDocument();
  //     expect(screen.getByLabelText(/Enter OTP/i)).toBeInTheDocument();
  //   });
  // });

  // Test 12: Allows typing in OTP field
  it("accepts input in the OTP field", async () => {
    // Mock successful login and OTP responses
    mockedLogin.mockResolvedValueOnce({
      success: true,
      userId: "testUserId",
    });
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Simulate entering email and password
    fireEvent.change(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    // Wait for OTP input to appear and then enter OTP
    await waitFor(() => expect(screen.getByLabelText(/Enter OTP/i)).toBeInTheDocument());
    const otpField = screen.getByLabelText(/Enter OTP/i);
    fireEvent.change(otpField, { target: { value: "123456" } });
    expect(otpField).toHaveValue("123456");
  });

  // Test 13: Displays a generic message to check inbox after OTP request
  it("displays message to check inbox after OTP request", async () => {
    // Mock login and OTP send responses
    mockedLogin.mockResolvedValueOnce({
      success: true,
      userId: "testUserId",
    });
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Simulate entering email and password
    fireEvent.change(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    // Wait for success message to appear
    await waitFor(() => {
      expect(screen.getByText("OTP sent to your email. Please check your inbox.")).toBeInTheDocument();
    });
  });
});