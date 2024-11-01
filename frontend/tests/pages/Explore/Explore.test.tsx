import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Explore from "../../../src/Pages/Explore/Explore";
import { MemoryRouter } from "react-router";

describe("Explore Page", () => {
  // Helper function to render the Explore page with MemoryRouter for routing
  const renderExplorePage = () =>
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

  test("renders Explore component without crashing", () => {
    renderExplorePage();
    expect(screen.getByPlaceholderText("Search jobs...")).toBeInTheDocument();
  });

  test("displays sorting buttons with correct default text", () => {
    renderExplorePage();
    expect(screen.getByText("Sort by Highest Pay : Off")).toBeInTheDocument();
    expect(screen.getByText("Sort by City : Off")).toBeInTheDocument();
    expect(screen.getByText("Sort by Employment Type : Off")).toBeInTheDocument();
    expect(screen.getByText("Show Closed Jobs")).toBeInTheDocument();
  });

  test("displays All Jobs heading in job list section", () => {
    renderExplorePage();
    expect(screen.getByText("All jobs")).toBeInTheDocument();
  });

  test("displays message when no jobs are available", () => {
    renderExplorePage();
    expect(screen.getByText("Nothing to show!")).toBeInTheDocument();
    expect(screen.getByText("Select a job for more details")).toBeInTheDocument();
  });
  test("renders the search bar with placeholder text", () => {
    renderExplorePage();
    const searchInput = screen.getByPlaceholderText("Search jobs...");
    expect(searchInput).toBeInTheDocument();
  });

  test("toggles sort by highest pay button text", () => {
    renderExplorePage();
    const sortButton = screen.getByText("Sort by Highest Pay : Off");
    fireEvent.click(sortButton);
    expect(sortButton).toHaveTextContent("Sort by High Pay : On");
  });

  test("toggles sort by city button text", () => {
    renderExplorePage();
    const sortButton = screen.getByText("Sort by City : Off");
    fireEvent.click(sortButton);
    expect(sortButton).toHaveTextContent("Sort by City : On");
  });

  test("toggles sort by employment type button text", () => {
    renderExplorePage();
    const sortButton = screen.getByText("Sort by Employment Type : Off");
    fireEvent.click(sortButton);
    expect(sortButton).toHaveTextContent("Sort by Employment Type : On");
  });

  test("toggles job status button text between open and closed jobs", () => {
    renderExplorePage();
    const jobStatusButton = screen.getByText("Show Closed Jobs");
    fireEvent.click(jobStatusButton);
    expect(jobStatusButton).toHaveTextContent("Show Open Jobs");
  });
});
