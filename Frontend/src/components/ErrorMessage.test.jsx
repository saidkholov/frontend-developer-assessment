import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  test('renders error message correctly', () => {
    const message = 'This is an error message';
    const onClose = jest.fn();

    render(<ErrorMessage message={message} onClose={onClose} />);

    const errorMessage = screen.getByText(message);
    expect(errorMessage).toBeInTheDocument();
  });
});