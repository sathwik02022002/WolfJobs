import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../../../src/components/Header/Header";
import { MemoryRouter } from "react-router";

describe("Header", () => {
  it("renders Header", () => {
    render(
      <MemoryRouter>
        <Header link={"/"} text="Home" />{" "}
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
});
