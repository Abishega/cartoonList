import React from 'react';
import dynamic from 'next/dynamic';
import { fetchCartoonDetails, fetchCartoonList } from '../../services/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Cartoon } from '../../utils/interface';
import Image from 'next/image';


const Button = dynamic(() => import('../../widgets/Button'), { loading: () => <div>Loading Button...</div> });

interface DetailsProps {
  cartoon: Cartoon;
}

const Details: React.FC<DetailsProps> = ({ cartoon }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">{cartoon.title}</h1>
        <p className="text-lg text-white font-medium">
          {cartoon.year} | {cartoon.episodes} Episodes
        </p>
      </div>

      {/* Cartoon Image */}
      <div className="flex justify-center mb-8">
        <Image
         height={200}
          width={200}
          src={cartoon.image}
          alt={cartoon.title}
          className="w-full sm:w-80 h-96 object-cover rounded-lg shadow-2xl "
        />
      </div>

      {/* Details Section */}
      <div className="text-white">
        <div className="space-y-4">
          <p className="text-xl">
            <strong>Creator(s):</strong> {cartoon.creator.join(', ')}
          </p>
          <p className="text-xl">
            <strong>Rating:</strong> {cartoon.rating}
          </p>
          <p className="text-xl">
            <strong>Genre(s):</strong> {cartoon.genre.join(', ')}
          </p>
          <p className="text-xl">
            <strong>Runtime:</strong> {cartoon.runtime_in_minutes} minutes
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">About this Cartoon</h2>
          <p className="text-lg text-white">{'No description available.'}</p>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <Button text="Back to Browse" link="/cartoon/browse" className="bg-blue-600 hover:bg-blue-700" />
        <Button text="Watch Now" onClick={() => alert('Watch Now Clicked')} className="bg-yellow-400 hover:bg-yellow-500" />
      </div>
    </div>
  );
};

// Fetching cartoon details
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const cartoon = await fetchCartoonDetails(Number(id));

  return {
    props: { cartoon },
  };
};

// Pre-rendering paths for each cartoon
export const getStaticPaths: GetStaticPaths = async () => {
  const cartoons = await fetchCartoonList();
  const paths = cartoons.map((cartoon) => ({
    params: { id: cartoon.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Details;
