import React, { useEffect, useState } from 'react';

interface PropsRating {
  setRating: React.Dispatch<React.SetStateAction<number>>
}

const StarRating = (props: PropsRating) => {
  const [rating, setRating] = useState<number>(0); // State variable to store the rating

  // Function to handle click event on stars
  const handleStarClick = (starValue: number) => {
    setRating(starValue); // Set the rating to the clicked star value
  };

  useEffect(()=>{
    props.setRating(rating)
  }, [rating, props])

  return (
    <div className='flex items-center'>
      {[1, 2, 3, 4, 5].map((starValue) => (

        <span key={starValue}
          onClick={() => handleStarClick(starValue)}
          className={`cursor-pointer text-3xl w-6 h-6 ${
            starValue <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
          </svg>
        </span>
      ))}
      {/* <p className="mt-2">Current rating: {rating}</p> */}
    </div>
  );
};

export default StarRating;
