'use client'

import {Option} from '@/app/lib/definitions';
import {useState} from 'react';

export default function Intensity() {
    const initialIntensity : Option[] =[
        {name: "grazing", isSelected: false},
        {name: "digging", isSelected: false},
        {name: "bedrock breaking", isSelected: false},
    ];

    const [intensities, setIntensity] = useState(initialIntensity);

    function handleIntensityClick(clickedName: string) {
        const updatedIntensity = intensities.map((currIntensity) => {
            if (currIntensity.name === clickedName) {
                currIntensity.isSelected = !currIntensity.isSelected;
            }
            return currIntensity;
        })
        setIntensity(updatedIntensity);
    }

    return (
    <div className="flex w-full mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 px-3 text-right">Which intensity?</h2>
      <div className="flex flex-wrap gap-3">
        {intensities.map((intensity) => (
          <button
            key={intensity.name}
            onClick={() => handleIntensityClick(intensity.name)}
            className={`
              px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 
              border-2 capitalize hover:scale-105 active:scale-95
              ${
                intensity.isSelected
                  ? 'bg-green-600 border-green-600 text-white shadow-md hover:bg-green-700 hover:border-green-700'
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