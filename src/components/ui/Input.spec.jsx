import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import Input from './Input';

describe('Input Componenet', () => {
  test('renders label when provided', () => {
    render(<Input id="name" label="Name" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  test('does not render label when not provided', () => {
    render(<Input id="no-label" />);
    expect(screen.queryByLabelText(/.+/)).not.toBeInTheDocument();
  });

  test('renders error message when error prop is passed', () => {
    render(<Input id="email" label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  test('applies size class based on size prop', () => {
    const { rerender } = render(<Input id="input" size="sm" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toMatch(/h-9/);

    rerender(<Input id="input" size="lg" />);
    expect(screen.getByRole('textbox').className).toMatch(/h-11/);
  });

  test('supports value and onChange props', () => {
    const handleChange = vi.fn();
    render(
      <Input
        id="username"
        label="Username"
        value="Test"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Username');
    expect(input.value).toBe('Test');

    fireEvent.change(input, { target: { value: 'doe' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input id="refTest" ref={(el) => (ref.current = el)} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
