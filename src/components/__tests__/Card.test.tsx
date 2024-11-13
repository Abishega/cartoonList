import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card';
import { Cartoon } from '../../utils/types';


  jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a href={href}>{children}</a>
    ),
  }));
  
  
const mockCartoon: Cartoon = {
  id: 1,
  title: 'Sample Cartoon',
  image: '/sample-image.jpg',
 
  year: 1998,
  creator: ['abu','abis'],
  rating: "TV",
  genre: ["comedy"],
  runtime_in_minutes: 34,
  episodes: 4,
 
};

test('renders the Card component with cartoon data', () => {
  render(<Card cartoon={mockCartoon} />);


  expect(screen.getByText(mockCartoon.title)).toBeInTheDocument();

  const imgElement = screen.getByRole('img', { name: mockCartoon.title });
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute('src', mockCartoon.image);

  expect(screen.getByRole('img', { name: 'star' })).toBeInTheDocument();
});

test('displays fallback image if the original image fails to load', () => {
  render(<Card cartoon={mockCartoon} />);

 
  const imgElement = screen.getByRole('img', { name: mockCartoon.title });
  fireEvent.error(imgElement);


  expect(imgElement).toHaveAttribute('src', '/fallback-image.jpg');
});

test('wraps the card with a Link component pointing to the correct URL', () => {
  render(<Card cartoon={mockCartoon} />);

  const linkElement = screen.getByRole('link');
  expect(linkElement).toHaveAttribute('href', `/cartoon/${mockCartoon.id}`);
});


