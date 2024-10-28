import { render, screen } from "@testing-library/react";
import React from "react";
import Interview from "../../../src/Pages/Interview/Interview";
import { MemoryRouter } from "react-router";

describe("Interview", () => {
  it("renders Interview", () => {
    render(
      <MemoryRouter>
        <Interview />
      </MemoryRouter>
    );
  });
});
