import { render, screen } from '@testing-library/react';
import JobTest from './JobTest';

test('renders learn react link', () => {
  render(<JobTest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('should match snapshot', () => {
    const {asFragment} =render(<JobTest />)
    expect(asFragment()).toMatchSnapshot()
  });