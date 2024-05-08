import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

jest.mock('axios');

beforeAll(() => {
  axios.create.mockReturnThis();
});

test('renders the footer text', () => {
  render(<App />);
  const footerElement = screen.getByText(/clearpoint.digital/i);
  expect(footerElement).toBeInTheDocument();
});

test('renders items on load', async () => {
  const mockData = [
    { id: 1, description: 'Item 1' },
    { id: 2, description: 'Item 2' },
    { id: 3, description: 'Item 3' },
  ];

  axios.get.mockResolvedValueOnce({ data: mockData });

  render(<App />);

  // Wait for the component to finish loading the items
  await screen.findByText('Item 1');
  await screen.findByText('Item 2');
  await screen.findByText('Item 3');

  // Assert that the items are rendered on the screen
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
  expect(screen.getByText('Item 3')).toBeInTheDocument();
});

test('adds an item', async () => {
  const mockItem = { id: 4, description: 'New Item' };

  axios.post.mockResolvedValueOnce({ data: mockItem });

  render(<App />);

  // Enter description
  const descriptionInput = screen.getByPlaceholderText('Enter description...');
  userEvent.type(descriptionInput, 'New Item');

  // Click Add Item button
  const addItemButton = screen.getByText('Add Item');
  userEvent.click(addItemButton);

  // Wait for the new item to be rendered on the screen
  await screen.findByText('New Item');

  // Assert that the new item is rendered on the screen
  expect(screen.getByText('New Item')).toBeInTheDocument();
});

test('marks an item as completed', async () => {
  const mockData = [
    { id: 1, description: 'Item 1', isCompleted: false },
    { id: 2, description: 'Item 2', isCompleted: false },
    { id: 3, description: 'Item 3', isCompleted: false },
  ];

  axios.get.mockResolvedValueOnce({ data: mockData });

  const mockUpdatedItem = { id: 2, description: 'Item 2', isCompleted: true };
  axios.put.mockResolvedValueOnce({ data: mockUpdatedItem });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  const selectedItem = screen.getByTestId('item-2');
  const markAsCompleteButton = within(selectedItem).getByText('Mark as completed');

  userEvent.click(markAsCompleteButton);

  await waitFor(() => {
    expect(within(selectedItem).getByText('Completed')).toBeInTheDocument();
  });
});
