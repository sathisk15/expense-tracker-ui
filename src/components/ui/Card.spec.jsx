import { render, screen } from '@testing-library/react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

describe('Card Components', () => {
  test('Render Card', () => {
    render(
      <Card className="test" id="test-id">
        <h1>Hello, World</h1>
      </Card>
    );
    const children = screen.getByText(/hello, world/i);
    expect(children).toBeInTheDocument();
    expect(children.parentElement.className).toContain('test');
    expect(children.parentElement.id).toContain('test-id');
  });

  test('Render CardHeader', () => {
    render(
      <CardHeader className="test" id="test-id">
        <h1>Hello, World</h1>
      </CardHeader>
    );
    const children = screen.getByText(/hello, world/i);
    expect(children).toBeInTheDocument();
    expect(children.parentElement.className).toContain('test');
    expect(children.parentElement.id).toContain('test-id');
  });

  test('Render CardTitle', () => {
    render(
      <CardTitle className="test" id="test-id">
        <h1>Hello, World</h1>
      </CardTitle>
    );
    const children = screen.getByText(/hello, world/i);
    expect(children).toBeInTheDocument();
    expect(children.parentElement.className).toContain('test');
    expect(children.parentElement.id).toContain('test-id');
  });

  test('Render CardDescription', () => {
    render(
      <CardDescription className="test" id="test-id">
        <h1>Hello, World</h1>
      </CardDescription>
    );
    const children = screen.getByText(/hello, world/i);
    expect(children).toBeInTheDocument();
    expect(children.parentElement.className).toContain('test');
    expect(children.parentElement.id).toContain('test-id');
  });

  test('Render CardFooter', () => {
    render(
      <CardFooter className="test" id="test-id">
        <h1>Hello, World</h1>
      </CardFooter>
    );
    const children = screen.getByText(/hello, world/i);
    expect(children).toBeInTheDocument();
    expect(children.parentElement.className).toContain('test');
    expect(children.parentElement.id).toContain('test-id');
  });
});
