import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from '../component/Flashcard';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    axios.get('https://flashcard-nnz8.onrender.com/api/flashcards')
      .then(res => {
        setFlashcards(res.data);
        setLoading(false);
      });
  }, []);

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length);
    setIsFlipped(false); // Ensure card shows the question
  };

  const prevCard = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false); // Ensure card shows the question
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // Toggle flip state on click
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[77vh] justify-center bg-zinc-200 overflow-y-hidden">
      <div className='bg-zinc-300 px-20 py-14 rounded-lg shadow-lg'>
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="loader"></div>
          </div>
        ) : (
          flashcards.length > 0 && (
            <div className="w-full max-w-md p-4" onClick={handleCardClick}>
              <Flashcard flashcard={flashcards[currentIndex]} isFlipped={isFlipped} />
            </div>
          )
        )}
        {/* Navigation Buttons */}
        {!loading && flashcards.length > 0 && (
          <div className="mt-4 flex justify-between w-full max-w-md ms-1">
            <button 
              onClick={prevCard}
              className="px-4 py-2 duration-500 bg-gray-600 w-[50%] text-white rounded rounded-e-none shadow-md hover:bg-gray-700 transition hover:text-zinc-400"
            >
              Previous
            </button>
            <button 
              onClick={nextCard} 
              className="px-4 py-2 duration-500 bg-gray-600 w-[50%] text-white rounded rounded-s-none shadow-md hover:bg-gray-700 transition hover:text-zinc-400"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardList;
