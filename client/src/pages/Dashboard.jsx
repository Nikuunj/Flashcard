import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const flashcardRefs = useRef({}); // To store references for each flashcard

  useEffect(() => {
    axios.get('https://flashcard-nnz8.onrender.com/api/flashcards').then(res => {
      setFlashcards(res.data);
      setLoading(false); // Set loading to false when data is fetched
      gsap.from(Object.values(flashcardRefs.current), {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1, // Stagger the animations
      });
    });
  }, []);

  const addFlashcard = () => {
    if(question === '' && answer === '') {
      alert('Plz write the question and answer')
      return;
    }
    if(question === '') {
      alert('Plz write quetion')
      return;
    }
    if(answer === '') {
      alert('Plz write answer')
      return;
    }
    if (editingId) {
      axios.put(`https://flashcard-nnz8.onrender.com/api/flashcards/${editingId}`, { question, answer })
        .then(() => {
          setFlashcards(flashcards.map(fc => fc.id === editingId ? { id: editingId, question, answer } : fc));
          resetForm();
        });
      gsap.from(flashcardRefs.current[editingId], { x: -10, yoyo: true, repeat: 3, duration: 0.2 });
    } else {
      axios.post('https://flashcard-nnz8.onrender.com/api/flashcards', { question, answer })
        .then(res => {
          setFlashcards([...flashcards, res.data]);
          resetForm();
          gsap.from(flashcardRefs.current[res.data.id], { opacity: 0, y: 20, duration: 0.5 });
        });
    }
  };

  const editFlashcard = (id) => {
    const fc = flashcards.find(f => f.id === id);
    setQuestion(fc.question);
    setAnswer(fc.answer);
    setEditingId(id);
    gsap.to(flashcardRefs.current[id], { x: -10, yoyo: true, repeat: 3, duration: 0.2 });
  };

  const deleteFlashcard = (id) => {
    axios.delete(`https://flashcard-nnz8.onrender.com/api/flashcards/${id}`).then(() => {
      gsap.to(flashcardRefs.current[id], { opacity: 0, y: 20, duration: 0.5, onComplete: () => {
        setFlashcards(flashcards.filter(fc => fc.id !== id));
      }});
    });
  };

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setEditingId(null);
  };

  return (
    <div className="p-4 min-h-[90vh]">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="border p-2 mr-2"
        />
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          className="border p-2 mr-2"
        />
        <button
          onClick={addFlashcard}
          className="bg-green-500 hover:bg-green-600 hover:text-zinc-200 text-white p-2 rounded"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="loader"></div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {flashcards.map(fc => (
            <li 
              key={fc.id} 
              className="border p-4 rounded shadow-lg flashcard"
              ref={(el) => (flashcardRefs.current[fc.id] = el)}
              onMouseEnter={() => gsap.to(flashcardRefs.current[fc.id], { scale: 1.05, boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)' })}
              onMouseLeave={() => gsap.to(flashcardRefs.current[fc.id], { scale: 1, boxShadow: 'none' })}
            >
              <div className="font-bold mb-2">{fc.question}</div>
              <div className="text-gray-600 mb-4">{fc.answer}</div>
              <div className="flex justify-between">
                <button
                  onClick={() => editFlashcard(fc.id)}
                  className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 hover:text-zinc-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFlashcard(fc.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 hover:text-zinc-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
