import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import { MemoryRouter as Router } from 'react-router-dom';
import api from '../../api/apiService';
import { toast } from 'sonner';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

const mockStore = configureStore([thunk]);

const initialState = {
  isLoading: false,
  isSuccess: null,
  message: null,
};

const renderWithRouter = (
  ui,
  store = mockStore({
    auth: initialState,
  })
) => {
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

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

// Mock NavigateFunction
const navigateMock = vi.fn();

// Mock navigate (spy on react-router)
vi.mock('react-router-dom', async () => {
  // Get the actual module to preserve other exports
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock, // return a mocked function
  };
});

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

    const store = mockStore({
      auth: {
        isLoading: false,
        isSuccess: true,
        message: 'Account created successfully.',
      },
    });

    renderWithRouter(<SignUp />, store);

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
        'Account created successfully.'
      );
    });

    await waitFor(
      () => {
        expect(navigateMock).toHaveBeenCalledWith('/signin');
      },
      { timeout: 500 }
    );
  });

  test('shows error toast on API failure', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { message: 'Email already taken' } },
    });

    const store = mockStore({
      auth: {
        isLoading: false,
        isSuccess: false,
        message: 'Email already taken',
      },
    });

    renderWithRouter(<SignUp />, store);

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
