import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal text-orange py-3 mt-4">
      
        <p className="mb-0">&copy; {currentYear} The Kenneth Akinyelure. All rights reserved.</p>
      
    </footer>
  );
};

export default Footer;
