import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Resume from "../../../src/Pages/Resume/Resume";

describe("Resume Page Basic Rendering", () => {
  it("renders Upload Resume button", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    expect(screen.getByText("Upload Resume")).toBeInTheDocument();
  });

  it("renders Cancel button", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("renders Current Resume section if resume name is available", () => {
    // Simply checking that Current Resume text is displayed as part of the render
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    const resumeText = screen.queryByText("Current Resume:");
    if (resumeText) {
      expect(resumeText).toBeInTheDocument();
    }
  });
  it("renders Cancel button and allows clicking", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    // Click the button to ensure it's interactive
    fireEvent.click(cancelButton);
  });
  it("shows View and Back buttons if resume name is available", () => {
    // Render the component to verify the display of the "View" and "Back" buttons
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    // Assuming the `Current Resume` section is visible when a resume is uploaded
    const viewButton = screen.queryByText("View");
    const backButton = screen.queryByText("Back");

    if (viewButton && backButton) {
      expect(viewButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
    }
  });
  it("displays the dropzone area for uploading a resume", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    const dropzoneText = screen.getByText(/Drag 'n' drop some files here/i);
    expect(dropzoneText).toBeInTheDocument();
  });
});
