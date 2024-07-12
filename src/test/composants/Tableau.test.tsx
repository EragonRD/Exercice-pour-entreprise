import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Tableau from '../../composants/tableau'
import {expect, jest, test} from '@jest/globals';

jest.mock('axios');

describe('Tableau component', () => {
  const mockData = [
    { userId: 1, id: 1, title: 'Task 1', completed: false },
    { userId: 2, id: 2, title: 'Task 2', completed: true },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders table with data', async () => {
    render(<Tableau />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  test('adds a new row to the table', async () => {
    render(<Tableau />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add'));
    });

    fireEvent.change(screen.getByLabelText('User ID'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('ID'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Task 3' } });
    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  test('edits an existing row in the table', async () => {
    render(<Tableau />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Edit')[0]);
    });

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Task 1' } });
    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Updated Task 1')).toBeInTheDocument();
  });

  test('deletes a row from the table', async () => {
    render(<Tableau />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0]);
    });

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });
});
 