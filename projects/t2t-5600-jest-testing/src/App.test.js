import { render, screen } from '@testing-library/react';
import App from './App';


test('renders make column', () => {
  render(<App />);
  const linkElement = screen.getByText(/make/i);
  console.log("***** LINK ELEMENT *****",linkElement.innerHTML)
  expect(linkElement).toBeInTheDocument();
});
