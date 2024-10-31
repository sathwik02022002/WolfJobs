// src/Pages/Interview/Interview.test.tsx

import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import { MemoryRouter } from "react-router";
import Interview from "../../../src/Pages/Interview/Interview";
import { toast } from "react-toastify";
import { useApplicationStore } from "../../../src/store/ApplicationStore";
import { useJobStore } from "../../../src/store/JobStore";

// Mock axios and toast
vi.mock("axios");
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock stores
vi.mock("../../../src/store/ApplicationStore");
vi.mock("../../../src/store/JobStore");

// Mock data for application and job stores
const mockApplicationList = [
  {
    _id: "1",
    applicantId: "applicant1",
    jobId: "job1",
    status: "interview_scheduled",
    interviewDate: "2024-11-15T10:30:00.000Z",
  },
];

describe("Interview Component", () => {
  beforeEach(() => {
    (axios.get as vi.Mock).mockResolvedValue({
      status: 200,
      data: { application: mockApplicationList },
    });

    // Mock implementations for application and job stores
    (useApplicationStore as vi.Mock).mockReturnValue({
      applicationList: mockApplicationList,
    });

    (useJobStore as vi.Mock).mockReturnValue({
      jobList: [{ _id: "job1", name: "Software Engineer" }],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () =>
    await act(async () =>
      render(
        <MemoryRouter>
          <Interview />
        </MemoryRouter>
      )
    );

  it("renders Interview", async () => {
    await renderComponent();
    expect(screen.getByText("Scheduled Interviews")).toBeInTheDocument();
  });

  it("shows a message when no interviews are scheduled", async () => {
    (axios.get as vi.Mock).mockResolvedValue({
      status: 200,
      data: { application: [] },
    });

    await renderComponent();
    await waitFor(() => {
      expect(
        screen.getByText("No scheduled interviews at this time.")
      ).toBeInTheDocument();
    });
  });

  it("displays error toast when fetch fails", async () => {
    (axios.get as vi.Mock).mockRejectedValue(new Error("Fetch failed"));

    await renderComponent();
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to load interview details"
      );
    });
  });
});
