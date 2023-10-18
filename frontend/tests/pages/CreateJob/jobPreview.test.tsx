import { render, screen } from "@testing-library/react";
import React from "react";
import { JobPreview } from "../../../src/Pages/CreateJob/jobPreview";
import { MemoryRouter } from "react-router";

describe("JobPreview", () => {
  it("renders JobPreview", () => {
    render(
      <MemoryRouter>
        <JobPreview />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
});
