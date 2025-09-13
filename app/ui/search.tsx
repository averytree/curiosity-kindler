'use client'

import { useState } from "react";
import { useAppContext } from "../lib/AppContext";


export default function SearchBar() {
  const {query, setQuery} = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return;
    
    console.log("Search received on server:", query);

    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row  items-stretch w-full max-w-4xl mx-auto bg-orange-200 rounded-lg shadow-md px-5 py-3 focus-within:ring-2 focus-within:ring-orange-200 transition"
    >
      <input
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
  );
}
