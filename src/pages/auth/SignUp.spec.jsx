import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import { MemoryRouter } from 'react-router-dom';
import api from '../../api/apiService';
import { toast } from 'sonner';

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

// Mock the api.post method
vi.mock('../../api/apiService', () => ({
  default: {
    post: vi.fn(),
  },
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}));

describe('SignUp Page', () => {
  test('Should render sign-up form', () => {
    renderWithRouter(<SignUp />);
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create an account/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    renderWithRouter(<SignUp />);
    fireEvent.click(screen.getByRole('button', { name: /create an account/i }));
    expect(
      await screen.findAllByText(/is required|must contain at least|invalid/i)
    ).toHaveLength(3);
  });

  test('calls api and navigates on successful submit', async () => {
    // Mock successful response
    api.post.mockResolvedValueOnce({
      data: { user: { id: 1, email: 'test@example.com' } },
    });

    // Mock navigate (spy on react-router)
    vi.mock('react-router-dom', async () => {
      // Get the actual module to preserve other exports
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => vi.fn(), // return a mocked function
      };
    });

    renderWithRouter(<SignUp />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'mypassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create an account/i }));
    // Wait for API call
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/signup', {
        firstName: 'Test User',
        email: 'test@example.com',
        password: 'mypassword',
      });
    });
    // Wait for toast success
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Account created successfully, You can now login.'
      );
    });
  });
  test('shows error toast on API failure', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { message: 'Email already taken' } },
    });

    renderWithRouter(<SignUp />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'mypassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create an account/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email already taken');
    });
  });
});
