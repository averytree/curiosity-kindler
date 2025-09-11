'use client'

import { useState } from "react";


export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return;
    
    console.log("Search received on server:", query);

    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-4xl mx-auto bg-green-200 rounded-lg shadow-md px-5 py-3 focus-within:ring-2 focus-within:ring-green-200 transition"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"What's your curiosity?"}
        className="flex-grow bg-transparent outline-none text-gray-950 placeholder-green-700 text-lg"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Ask Away
      </button>
    </form>
  );
}
