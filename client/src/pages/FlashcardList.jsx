import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from '../component/Flashcard'; 


const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    axios.get('https://flashcard-nnz8.onrender.com/api/flashcards')
      .then(res => {
        setFlashcards(res.data);
        setLoading(false); 
      });
  }, []);

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[90vh] justify-center">
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="loader"></div> 
        </div>
      ) : (
        flashcards.length > 0 && (
          <div className="w-full max-w-md p-4">
            <Flashcard flashcard={flashcards[currentIndex]} />
          </div>
        )
      )}

      {/* Navigation Buttons */}
      {!loading && flashcards.length > 0 && (
        <div className="mt-4 flex justify-between w-full max-w-md">
          <button 
            onClick={prevCard} 
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
          >
            Previous
          </button>
          <button 
            onClick={nextCard} 
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default FlashcardList;