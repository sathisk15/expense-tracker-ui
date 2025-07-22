import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Componenet', () => {
  test('Render Button', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: /Submit/ }));
  });

  test('applies default variant and size classes', () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/bg-indigo-600/); // default variant
    expect(btn.className).toMatch(/h-10/); // default size
  });

  test('applies variant class when specified', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button').className).toMatch(/border-gray-200/);
  });

  test('applies size class when specified', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button').className).toMatch(/h-11/);
  });

  test('applies additional classes when specified', () => {
    render(<Button className="test">ClassName</Button>);
    expect(screen.getByRole('button').className).toMatch(/test/);
  });

  test('Check disabled prop', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.className).toMatch(/disabled/i);
  });

  test('Trigger Click Events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
