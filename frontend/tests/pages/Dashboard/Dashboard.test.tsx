import { render, screen } from "@testing-library/react";
import React from "react";
import Dashboard from "../../../src/Pages/Dashboard/Dashboard";
import { MemoryRouter } from "react-router";

describe("Dashboard", () => {
  it("renders Dashboard", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    // const headingElement = screen.queryByText((_content, element) => {
    //   return element?.textContent?.includes("My Listings");
    // });
  });
});
