import { render, screen, fireEvent } from '@testing-library/react';
import PersistentDrawerLeft from '../../composants/sidebar';
import '@testing-library/jest-dom'


describe('PersistentDrawerLeft component', () => {
 
  test('opens and closes the drawer when buttons are clicked', () => {
    render(<PersistentDrawerLeft />);
    const openButton = screen.getByLabelText('open drawer');
    const closeButton = screen.getByLabelText('close drawer');

    // Vérifiez que le tiroir est fermé initialement
    expect(screen.queryByText('Reception')).not.toBeInTheDocument();

    // Ouvrez le tiroir
    fireEvent.click(openButton);
    expect(screen.getByText('Reception')).toBeInTheDocument();

    // Fermez le tiroir
    fireEvent.click(closeButton);
    expect(screen.queryByText('Reception')).not.toBeInTheDocument();
  });

  test('renders list items correctly', () => {
    render(<PersistentDrawerLeft />);
    const openButton = screen.getByLabelText('open drawer');
    fireEvent.click(openButton);

    const listItems = ['Reception', 'Marquée', 'Envoyer un message'];
    listItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
