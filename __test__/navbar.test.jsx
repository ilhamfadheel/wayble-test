import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar';
import { Providers } from '../src/store/provider';

describe('Navbar Test', () => {
  it('renders web title', () => {
    render(
      <Providers>
        <Navbar />
      </Providers>,
    );

    const heading = screen.getByText('Wayble Challenge');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(heading).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
