'use client' 

import { createContext, useContext, useState } from "react";
import {Option} from '@/app/lib/definitions';

interface AppContextType {
  tones: Option[];
  setTones: (t: Option[]) => void;
  intensities: Option[];
  setIntensities: (i: Option[]) => void;
  query: string;
  setQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {

    const initialTones : Option[] = [
        {name: "practical", isSelected: false},
        {name: "theoretical", isSelected: false},
        {name: "personal", isSelected: false},
        {name: "playful", isSelected: false},
        {name: "formal", isSelected: false}, 
        {name: "debatable", isSelected: false}, 
        {name: "absurd", isSelected: false} 
    ];

    const initialIntensity : Option[] =[
        {name: "spark", isSelected: false},
        {name: "flame", isSelected: false},
        {name: "inferno", isSelected: false},
    ];

    const [tones, setTones] = useState(initialTones);
    const [intensities, setIntensities] = useState(initialIntensity);
    const [query, setQuery] = useState("");

    return (
        <AppContext.Provider value={{ tones, setTones, intensities, setIntensities, query, setQuery }}>
        {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};