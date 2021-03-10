// Dependencies
import React from 'react';
import logo from '../images/logo/logo-gray.jpg';

// Styles
import '../styles/Header.css';

export default function Header() {
  return (
    <div className='header'>
      <img 
        src={logo} 
        alt='logo'
      />
    </div>
  )
};