import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Browse from '../../pages/cartoon/browse';
import { fetchCartoonList } from '../../services/api';
import React from 'react';


jest.mock('../services/api', () => ({
  fetchCartoonList: jest.fn(), 
}));

describe('Browse Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
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

 
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Search Cartoons...'), { target: { value: 'Non-existent Cartoon' } });
    

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Oops! No cartoons found for your search.')).toBeInTheDocument();
    });
  });
});
