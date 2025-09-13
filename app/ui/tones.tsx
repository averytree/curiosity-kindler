'use client'

import {Option} from '@/app/lib/definitions';
import {useState} from 'react';
import { useAppContext } from '../lib/AppContext';

export default function Tones() {
    

    const {tones, setTones} = useAppContext();

    function handleToneClick(clickedName: string) {
        const updatedTones = tones.map((currTone)=> {
            if (currTone.name === clickedName) {
                currTone.isSelected = !currTone.isSelected;
            }
            return currTone;
        })
        setTones(updatedTones);
    }


    return (
    <div className="flex flex-col md:flex-row w-full mx-auto max-w-4xl md:items-center">
      <h2 className="text-2xl font-bold mb-4 md:mb-0 px-3 text-center md:text-left md:whitespace-nowrap">Which tones?</h2>
      <div className="flex justify-center md:justify-start flex-wrap gap-3">
        {tones.map((tone) => (
          <button
            key={tone.name}
            onClick={() => handleToneClick(tone.name)}
            className={`
              px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 
              border-2 capitalize hover:scale-105 active:scale-95
              ${
                tone.isSelected
                  ? 'bg-orange-600 border-orange-600 text-white shadow-md hover:bg-orange-700 hover:border-orange-700'
                  : 'bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300 hover:border-gray-300'
              }
            `}
          >
            {tone.name}
          </button>
        ))}
      </div>
      </div>
    );
}
