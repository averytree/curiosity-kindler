'use client'

import {Option} from '@/app/lib/definitions';
import {useState} from 'react';

export default function Tones() {
    const initialTones : Option[] = [
        {name: "practical", isSelected: false},
        {name: "theoretical", isSelected: false},
        {name: "personal", isSelected: false},
        {name: "playful", isSelected: false},
        {name: "formal", isSelected: false}, 
        {name: "debatable", isSelected: false}, 
        {name: "absurd", isSelected: false} 
    ];

    const [tones, setTones] = useState(initialTones);

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
    <div className="flex w-full mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 px-3 text-right">Which tones?</h2>
      <div className="flex flex-wrap gap-3">
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
