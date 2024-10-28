import { render, screen } from "@testing-library/react";
import React from "react";
import CalendarPage from "../../../src/Pages/Calendar/CalendarPage";
import { MemoryRouter } from "react-router";

describe("CalendarPage", () => {
  it("renders CalendarPage", () => {
    render(
      <MemoryRouter>
        <CalendarPage />
      </MemoryRouter>
    );
  });
});
