import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Browse from '../browse';
import { fetchCartoonList } from '../../../services/api';

// Mock the API service call
jest.mock('../services/api', () => ({
  fetchCartoonList: jest.fn(), // Mock the function
}));

describe('Browse Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('should display cartoons correctly after successful search', async () => {
    const mockCartoons = [
      { id: 1, title: 'Cartoon 1' },
      { id: 2, title: 'Cartoon 2' },
    ];
    (fetchCartoonList as jest.Mock).mockResolvedValue(mockCartoons);

    await act(async () => {
      render(<Browse />);
    });

    // Check if the cartoons are displayed
    expect(screen.getByText('Cartoon 1')).toBeInTheDocument();
    expect(screen.getByText('Cartoon 2')).toBeInTheDocument();
  });

  it('should display "No results found" when no cartoons match the search', async () => {
    const mockCartoons = [
      { id: 1, title: 'Cartoon 1' },
      { id: 2, title: 'Cartoon 2' },
    ];
    (fetchCartoonList as jest.Mock).mockResolvedValue(mockCartoons);

    await act(async () => {
      render(<Browse />);
    });

    // Wait for cartoons to load
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    // Trigger a search with a term that yields no results
    fireEvent.change(screen.getByPlaceholderText('Search Cartoons...'), { target: { value: 'Non-existent Cartoon' } });
    
    // Find and click the Button component with "Search" text
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Oops! No cartoons found for your search.')).toBeInTheDocument();
    });
  });
});
