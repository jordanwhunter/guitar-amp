// Dependencies
import React from 'react';

// Styles
import '../styles/Mixer.css';

export default function Mixer() {
  return (
    <div className='mixer'>
      <div className='grid'>
        <label htmlFor='volume'>Volume</label>
        <input 
          type='range'
          id='volume'
          min='0'
          max='1'
          defaultValue='0.5'
          step='.01'
        /> 

        <label htmlFor='treble'>Treble</label>
        <input 
          type='range' 
          id='treble'
          min='-10'
          max='10'
          defaultValue='0'
        /> 
        
        <label htmlFor='mid'>Mid</label>
        <input 
          type='range' 
          id='mid'
          min='-10'
          max='10'
          defaultValue='0'
        /> 

        <label htmlFor='bass'>Bass</label>
        <input 
          type='range' 
          id='bass'
          min='-10'
          max='10'
          defaultValue='0'
        /> 
      </div>
    </div>
  )
};