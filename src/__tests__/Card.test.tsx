import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card'; // Assuming your Card component is here
import { Cartoon } from '../utils/interface';

describe('Card Component', () => {
  const cartoon: Cartoon = {
    id: 1,
    title: 'Test Cartoon',
    image: '/cartoon-image.jpg',
    year: 2024,
    creator: ['John Doe'],
    rating: "tvk",
    genre: ['Action'],
    runtime_in_minutes: 3,
    episodes: 5,
  };

  it('navigates to the correct link when clicked', () => {
    render(<Card cartoon={cartoon} />);
    const linkElement = screen.getByRole('link', { name: cartoon.title });
    expect(linkElement).toHaveAttribute('href', `/cartoon/${cartoon.id}`);
  });
});
