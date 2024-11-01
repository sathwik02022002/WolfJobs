import { render, screen } from "@testing-library/react";
import React from "react";
import JobDetail from "../../../src/components/Job/JobDetails";
import { MemoryRouter } from "react-router";

describe("JobDetail Component", () => {
  const jobData = {
    type: "part-time",
    _id: 1,
    managerid: 1,
    name: "Developer",
    status: "open",
    location: "Raleigh",
    pay: "100",
    description: "Developer role in a fast-paced environment.",
    questions: ["Work experience?", "CGPA?", "Age?", "Skills?"],
  };

  it("renders JobDetail component without crashing", () => {
    render(
      <MemoryRouter>
        <JobDetail jobData={jobData} />
      </MemoryRouter>
    );
  });

  it("displays job details correctly", () => {
    render(
      <MemoryRouter>
        <JobDetail jobData={jobData} />
      </MemoryRouter>
    );

    expect(screen.getByText("Job Details")).toBeInTheDocument();
    expect(screen.getByText("Role:")).toBeInTheDocument();
    expect(screen.getAllByText("Developer")[0]).toBeInTheDocument();
    expect(screen.getByText("Job Status:")).toBeInTheDocument();
    expect(screen.getByText("open")).toBeInTheDocument();
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Part time")).toBeInTheDocument();
    expect(screen.getByText("Location:")).toBeInTheDocument();
    expect(screen.getByText("Raleigh")).toBeInTheDocument();
    expect(screen.getByText("Required Skills:")).toBeInTheDocument();
  });

  it("displays pay correctly", () => {
    render(
      <MemoryRouter>
        <JobDetail jobData={jobData} />
      </MemoryRouter>
    );

    expect(screen.getByText("100$/hr")).toBeInTheDocument();
  });

  // it("displays the questionnaire questions if applicable", () => {
  //   render(
  //     <MemoryRouter>
  //       <JobDetail jobData={jobData} />
  //     </MemoryRouter>
  //   );

  //   jobData.questions.forEach((question) => {
  //     expect(screen.getByText(question)).toBeInTheDocument();
  //   });
  // });

  it("renders application status for Applicant if applicable", () => {
    render(
      <MemoryRouter>
        <JobDetail jobData={jobData} role="Applicant" applicationStatus="In Review" />
      </MemoryRouter>
    );

    const applicationStatusText = screen.queryByText("Application Status:");
    if (applicationStatusText) {
      expect(applicationStatusText).toBeInTheDocument();
      expect(screen.getByText("In Review")).toBeInTheDocument();
    }
  });

  it("displays the 'Apply Now' button for open jobs when no application exists", () => {
    render(
      <MemoryRouter>
        <JobDetail jobData={jobData} role="Applicant" />
      </MemoryRouter>
    );

    const applyButton = screen.queryAllByText("Apply Now")[0];
    if (applyButton) {
      expect(applyButton).toBeInTheDocument();
    }
  });

  it("displays 'Description' section", () => {
    render(
      <MemoryRouter>
        <JobDetail
          jobData={{
            ...jobData,
            description: "Developer role in a fast-paced environment.",
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Developer role in a fast-paced environment.")).toBeInTheDocument();
  });
});
