import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-[5px]">
      <div className="container mx-auto flex justify-center space-x-6">
        <a href="https://github.com/Nikuunj" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/makwana-nikunj/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FaLinkedin size={24} />
        </a>
        <a href="https://nikunj-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FaGlobe size={24} />
        </a>
      </div>
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Nikunj Makwana.</p>
      </div>
    </footer>
  );
}

export default Footer;
