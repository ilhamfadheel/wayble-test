import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobCard from '../src/components/JobCard';
import { Providers } from '../src/store/provider';

describe('JobCard Component', () => {
  it('renders job information correctly', () => {
    // Mock job data
    const mockJob = {
      id: 1,
      companyName: 'Tech Innovations Inc.',
      jobTitle: 'Frontend Developer',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      address: {
        street: '123 Tech Lane',
        city: 'Innovate City',
        province: 'Tech Province',
        postalCode: 'T1234',
      },
    };

    render(
      <Providers>
        <JobCard {...mockJob} />
      </Providers>,
    );

    expect(screen.getByText(mockJob.jobTitle)).toBeInTheDocument();
    expect(screen.getByText(mockJob.companyName)).toBeInTheDocument();
    expect(screen.getByText(mockJob.about)).toBeInTheDocument();
  });
});
