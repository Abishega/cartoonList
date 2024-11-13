import { render, screen, fireEvent } from '@testing-library/react';
import Details, { getStaticProps } from '../../pages/cartoon/[id]';
import { fetchCartoonDetails, fetchCartoonList } from '../../services/api';
import { Cartoon } from '../../utils/types';
import { GetStaticPropsContext } from 'next';
import React from 'react';


jest.mock('../../../services/api', () => ({
    fetchCartoonDetails: jest.fn(),
    fetchCartoonList: jest.fn(),
  }));
  

  jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  }));
  
  const mockCartoon: Cartoon = {
    id: 1,
    title: 'Sample Cartoon',
    image: '/sample-image.jpg',
    year: 2022,
    episodes: 24,
    creator: ['Creator 1', 'Creator 2'],
    rating: '8.5',
    genre: ['Comedy', 'Action'],
    runtime_in_minutes: 25,
  };
  
  describe('Details Page', () => {
    beforeEach(() => {
      (fetchCartoonDetails as jest.Mock).mockResolvedValue(mockCartoon);
      (fetchCartoonList as jest.Mock).mockResolvedValue([{ id: 1, title: 'Sample Cartoon' }]);
    });
  
    it('renders cartoon details correctly', async () => {
        render(<Details cartoon={mockCartoon} />);
      

        expect(screen.getByText(mockCartoon.title)).toBeInTheDocument();
      
       
        expect(screen.getByText(`${mockCartoon.year} | ${mockCartoon.episodes} Episodes`)).toBeInTheDocument();

        expect(screen.getByText(/Creator\(s\):/i)).toBeInTheDocument();
        expect(screen.getByText(mockCartoon.creator.join(', '))).toBeInTheDocument();
      

      });
      
  
    it('renders buttons correctly', () => {
      render(<Details cartoon={mockCartoon} />);
  
      // Check for Back to Browse button
      const backButton = screen.getByRole('button', { name: /back to browse/i });
      expect(backButton).toBeInTheDocument();
      
      // Check for Watch Now button
      const watchButton = screen.getByRole('button', { name: /watch now/i });
      expect(watchButton).toBeInTheDocument();
    });
  
    it('calls getStaticProps correctly', async () => {
      const context: GetStaticPropsContext = {
        params: { id: '1' },
      };
      
      const result = await getStaticProps(context);
  
      expect(fetchCartoonDetails).toHaveBeenCalledWith(1); 
      expect(result).toEqual({
        props: { cartoon: mockCartoon },
      });
    });
  

    it('handles the Back to Browse button click', async () => {
      render(<Details cartoon={mockCartoon} />);
      const backButton = screen.getByRole('button', { name: /back to browse/i });
      fireEvent.click(backButton);
      
    });
  

  });