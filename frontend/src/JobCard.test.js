import { render, screen } from '@testing-library/react';
import JobCard from './JobCard';

test('renders learn react link', () => {
  render(<JobCard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('should match snapshot', () => {
    const {asFragment} =render(<JobCard />)
    expect(asFragment()).toMatchSnapshot()
  });