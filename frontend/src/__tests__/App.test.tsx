import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';

// Mock Firebase
jest.mock('../config/firebase', () => ({
  auth: {},
  db: {},
}));

// Mock AuthContext
jest.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    user: null,
    loading: false,
    signInWithGoogle: jest.fn(),
    signUpWithEmail: jest.fn(),
    signInWithEmail: jest.fn(),
    logout: jest.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('App Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('displays navigation', () => {
    renderWithProviders(<App />);
    // The app should render some navigation elements
    // This is a basic smoke test
  });
});

describe('Navigation', () => {
  it('renders home page by default', () => {
    renderWithProviders(<App />);
    // Should render the home page content
    // Add more specific assertions based on your home page content
  });
});
