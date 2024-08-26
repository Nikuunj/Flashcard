import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Flashcard = ({ flashcard, isFlipped }) => {
  const cardRef = useRef(null);
  const frontTextRef = useRef(null);
  const backTextRef = useRef(null);

  useEffect(() => {
    // Update flip animation based on isFlipped state
    gsap.to(cardRef.current, {
      rotateY: isFlipped ? 180 : 0,
      duration: 0.8,
      ease: 'power2.inOut',
    });

    // Animate text visibility based on isFlipped state
    gsap.to(frontTextRef.current, {
      opacity: isFlipped ? 0 : 1,
      duration: 0.5,
    });
    gsap.to(backTextRef.current, {
      opacity: isFlipped ? 1 : 0,
      duration: 0.5,
    });
  }, [isFlipped, flashcard]); // Dependencies ensure animation runs when isFlipped changes

  return (
    <div
      className="relative w-80 h-48 bg-white shadow-lg rounded-lg"
      ref={cardRef}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Front Side */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-lg"
        ref={frontTextRef}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)',
        }}
      >
        <div className='text-center'>
          <p className='font-bold text-xl text-zinc-800'>Question:</p>
          <p className='text-zinc-400'>{flashcard.question}</p>
        </div>
      </div>

      {/* Back Side */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-lg"
        ref={backTextRef}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className='text-center'>
          <p className='font-bold text-xl text-zinc-800'>Answer:</p>
          <p className='text-zinc-400'>{flashcard.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;