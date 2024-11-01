import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from "../../../src/Pages/Dashboard/Dashboard";
import { MemoryRouter } from 'react-router-dom';
import JobListTile from '../../../src/components/Job/JobListTile';

const mockJobs = [
  {
    _id: "671f1b36e6998863aa6d5128",
    name: "Chef assistant",
    managerid: "671f13b0e6998863aa6d50f0",
    managerAffilication: "nc-state-dining",
    status: "open",
    location: "Dining",
    description: "Assist the Chef",
    pay: "13",
    requiredSkills: "Cooking",
    type: "full-time",
    question1: "What makes you a good fit?",
    question2: "Availability?",
    question3: "Can you work on weekends?",
    question4: "Something unique about you?",
    __v: 0,
  }
];

describe('Dashboard Page', () => {
  it('renders Dashboard component', () => {
    render(
      <MemoryRouter>
        <Dashboard jobs={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/My Applications/i)).toBeInTheDocument();
  });
  

  it('displays "Nothing to show!" when there are no jobs', () => {
    render(
      <MemoryRouter>
        <Dashboard jobs={[]} />
      </MemoryRouter>
    );

    // Check for the "Nothing to show!" message when no jobs are provided
    expect(screen.getByText(/Nothing to show!/i)).toBeInTheDocument();
  });

  it('renders at least one section or div', () => {
    const { container } = render(
      <MemoryRouter>
        <Dashboard jobs={[]} />
      </MemoryRouter>
    );
  
    // Looks for at least one section or div element
    expect(container.querySelector('section') || container.querySelector('div')).toBeInTheDocument();
  });
  it('renders text containing "Applications"', () => {
    render(
      <MemoryRouter>
        <Dashboard jobs={[]} />
      </MemoryRouter>
    );
  
    expect(screen.queryByText(/Applications/i)).toBeInTheDocument();
  });
  
  it('renders Dashboard with an empty job list without content checks', () => {
    render(
      <MemoryRouter>
        <Dashboard jobs={[]} />
      </MemoryRouter>
    );
  });

  it('renders a main container div in Dashboard', () => {
    const { container } = render(
      <MemoryRouter>
        <Dashboard jobs={[]} />
      </MemoryRouter>
    );
    const mainDiv = container.querySelector('div');
    expect(mainDiv).toBeInTheDocument();
  });


});