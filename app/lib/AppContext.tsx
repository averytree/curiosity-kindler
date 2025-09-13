'use client' 

import { createContext, useContext, useState } from "react";
import {Option, initialIntensity, initialTones} from '@/app/lib/definitions';

interface AppContextType {
  tones: Option[];
  setTones: (t: Option[]) => void;
  intensities: Option[];
  setIntensities: (i: Option[]) => void;
  query: string;
  setQuery: (q: string) => void;
  responses: string;
  setResponses: (r:string) => void;
  responseStatus: string;
  setResponseStatus:(r:string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {

    const [tones, setTones] = useState(initialTones);
    const [intensities, setIntensities] = useState(initialIntensity);
    const [query, setQuery] = useState("");
    const [responses, setResponses] = useState("");
    const [responseStatus, setResponseStatus] = useState("empty")

    return (
        <AppContext.Provider value={{ tones, setTones, intensities, setIntensities, query, setQuery, responses, setResponses, responseStatus, setResponseStatus}}>
        {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};