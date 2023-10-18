import { render, screen } from "@testing-library/react";
import React from "react";
import Explore from "../../../src/Pages/Explore/Explore";
import { MemoryRouter } from "react-router";

describe("Explore", () => {
  it("renders Explore", () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
});
