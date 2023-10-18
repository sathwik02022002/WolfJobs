import { render, screen } from "@testing-library/react";
import React from "react";
import JobDetails from "../../../src/components/Job/JobDetails";
import { MemoryRouter } from "react-router";

describe("JobDetails", () => {
  it("renders JobDetails", () => {
    render(
      <MemoryRouter>
        <JobDetails jobData={{ type: "parttime" }} />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
});
