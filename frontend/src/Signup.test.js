import { render, screen } from '@testing-library/react';
import Signup from './Signup';

test('renders learn react link', () => {
  render(<Signup />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('should match snapshot', () => {
    const {asFragment} =render(<Signup />)
    expect(asFragment()).toMatchSnapshot()
  });