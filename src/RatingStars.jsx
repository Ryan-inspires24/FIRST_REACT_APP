import React from 'react';

const RatingStars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const empty = 5 - full - (half ? 1 : 0);

  const stars = [
    ...Array(full).fill('★'),
    ...(half ? ['⯪'] : []),
    ...Array(empty).fill('☆'),
  ];

  return (
    <span style={{ color: 'gold', fontSize: '1.5rem', letterSpacing: '2px' }}>
      {stars.join('')}
    </span>
  );
};

export default RatingStars;
