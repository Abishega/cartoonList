
import React from 'react';
import { fetchCartoonDetails, fetchCartoonList } from '../services/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Cartoon } from '../utils/types';

interface DetailsProps {
  cartoon: Cartoon;
}

const Details: React.FC<DetailsProps> = ({ cartoon }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{cartoon.title}</h1>
      <img src={cartoon.image} alt={cartoon.title} className="w-full h-96 object-cover mb-4" />
      <p><strong>Year:</strong> {cartoon.year}</p>
      <p><strong>Creator(s):</strong> {cartoon.creator.join(', ')}</p>
      <p><strong>Rating:</strong> {cartoon.rating}</p>
      <p><strong>Genre(s):</strong> {cartoon.genre.join(', ')}</p>
      <p><strong>Runtime:</strong> {cartoon.runtime_in_minutes} minutes</p>
      <p><strong>Episodes:</strong> {cartoon.episodes}</p>
    </div>
  );
};

// `getStaticProps` for fetching the cartoon details
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id; // Get the id from the URL params
  const cartoon = await fetchCartoonDetails(Number(id));
  
  // Return the cartoon data as props to the component
  return {
    props: { cartoon },
  };
};

// `getStaticPaths` for pre-rendering paths
export const getStaticPaths: GetStaticPaths = async () => {
  const cartoons = await fetchCartoonList();
  
  // Create paths for each cartoon based on their `id`
  const paths = cartoons.map((cartoon) => ({
    params: { id: cartoon.id.toString() },
  }));

  // Return the paths and define the fallback behavior
  return {
    paths,
    fallback: 'blocking', // blocking ensures the page is generated at request time if not pre-rendered
  };
};

export default Details;
