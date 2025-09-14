'use client'

import { useAppContext } from "../lib/AppContext";
import { formulateMessage, queryAPI } from "../lib/actions";
import { useState } from "react";
import Image from 'next/image';


export default function SearchBar() {
  const {query, setQuery, tones, intensities,  setResponses, setResponseStatus} = useAppContext();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //prevent form default behavior e.g. browser reload
    e.preventDefault();
    if (query.trim() === "") return;

    //configure loading state while we wait for the query to process
    setLoading(true);
    setResponseStatus("empty");
    const messageForLLM = formulateMessage(tones, intensities, query);
    
    try {
      const reply = await queryAPI(messageForLLM);
      setLoading(false);
      setResponses(reply);
      setResponseStatus(query);
      setQuery("");
    }
    catch(err) {
      setLoading(false);
      console.error("Error fetching API:", err);
      setResponseStatus("error");
    }   
  }
    

   

  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row  items-stretch w-full bg-orange-200 rounded-lg shadow-md px-5 py-3 focus-within:ring-2 focus-within:ring-orange-200 transition"
    >
      <input
        name="User open-ended input regarding curiosity"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"What would you like to explore?"}
        className="flex-grow bg-transparent outline-none text-gray-950 placeholder-orange-700 text-md md:text-lg mb-4 md:mb-0"
      />
      <button
        type="submit"
        className="md:ml-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition hover:scale-105 active:scale-95"
      >
        Ask Away
      </button>
    </form>
      {isLoading && <Image 
      src="/loadman.gif" 
      alt="A loading gif of a spinning ball person" 
      width="80"
      height="80"
      className="h-auto mt-6 rounded-lg"
      unoptimized/>}
    </div>
  );
}
