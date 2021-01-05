import { render, screen } from '@testing-library/react';
import CompanyCard from './CompanyCard';

test('renders learn react link', () => {
  render(<CompanyCard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('should match snapshot', () => {
    const {asFragment} =render(<CompanyCard />)
    expect(asFragment()).toMatchSnapshot()
  });