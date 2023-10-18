import { render, screen } from "@testing-library/react";
import React from "react";
// import Header from "../../../src/components/Header/Header";
import NavBarItem from "../../../src/components/Header/NavBarItem";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("renders Header", () => {
    render(
      <MemoryRouter>
        <NavBarItem />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
});
