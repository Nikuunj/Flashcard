import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';


const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const frontTextRef = useRef(null);
  const backTextRef = useRef(null);
  useEffect(() => {
    // Set initial state
    gsap.set(cardRef.current, { rotateY: 0 });
    gsap.set(backTextRef.current, { opacity: 0 });
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);

    // Flip animation
    gsap.to(cardRef.current, {
      rotateY: isFlipped ? 0 : 180,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Swap text opacity based on flip state
        if (isFlipped) {
          gsap.fromTo(frontTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
          gsap.to(backTextRef.current, { opacity: 0, duration: 0.5 });
        } else {
          gsap.fromTo(backTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
          gsap.to(frontTextRef.current, { opacity: 0, duration: 0.5 });
        }
      },
    });
  };

  return (
    <div
      className="w-80 h-48 bg-white shadow-lg rounded-lg cursor-pointer"
      onClick={handleFlip}
      ref={cardRef}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Front Side */}
      <div
        className="absolute inset-0 flex items-center justify-center shadow-inner shadow-slate-500 rounded-lg"
        ref={frontTextRef}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)',
        }}
      >
        <p>{flashcard.question}</p>
      </div>

      {/* Back Side */}
      <div
        className="absolute inset-0 flex items-center justify-center shadow-inner shadow-slate-500 rounded-lg"
        ref={backTextRef}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <p>{flashcard.answer}</p>
      </div>
    </div>
  );
};

export default Flashcard;
