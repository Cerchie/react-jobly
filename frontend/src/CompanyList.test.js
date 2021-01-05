import { render, screen } from '@testing-library/react';
import CompanyList from './CompanyList';

test('renders learn react link', () => {
  render(<CompanyList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('should match snapshot', () => {
    const {asFragment} =render(<CompanyList />)
    expect(asFragment()).toMatchSnapshot()
  });