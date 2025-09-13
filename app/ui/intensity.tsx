'use client'

import {Option} from '@/app/lib/definitions';
import {useState} from 'react';
import { useAppContext } from '../lib/AppContext';

export default function Intensity() {
    
    const {intensities, setIntensities} = useAppContext()

    function handleIntensityClick(clickedName: string) {
        const updatedIntensity = intensities.map((currIntensity) => {
            if (currIntensity.name === clickedName) {
                currIntensity.isSelected = !currIntensity.isSelected;
            }
            return currIntensity;
        })
        setIntensities(updatedIntensity);
    }

    return (
    <div className="flex flex-col md:flex-row w-full mx-auto max-w-4xl md:items-center">
      <h2 className="text-2xl font-bold mb-4 md:mb-0 px-3 text-center md:text-left md:whitespace-nowrap">Which intensity?</h2>
      <div className="flex justify-center md:justify-start flex-wrap gap-3">
        {intensities.map((intensity) => (
          <button
            key={intensity.name}
            onClick={() => handleIntensityClick(intensity.name)}
            className={`
              px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 
              border-2 capitalize hover:scale-105 active:scale-95
              ${
                intensity.isSelected
                  ? 'bg-orange-600 border-orange-600 text-white shadow-md hover:bg-orange-700 hover:border-orange-700'
                  : 'bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300 hover:border-gray-300'
              }
            `}
          >
            {intensity.name}
          </button>
        ))}
      </div>
      </div>
    );
}