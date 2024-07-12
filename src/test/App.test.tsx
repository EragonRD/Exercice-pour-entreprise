import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  test('renders Tableau component', () => {
    render(<App />);
    const tableauElement = screen.getByText('User ID');
    expect(tableauElement).toBeInTheDocument();
  });

  
});
