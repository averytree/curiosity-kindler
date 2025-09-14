import Tones from "./ui/tones";
import Intensity from "./ui/intensity";
import SearchBar from "./ui/search";
import Responses from "./ui/responses";

export default function Home() {

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-10 font-[family-name:var(--font-aleo-sans)]">
      <main className="flex flex-col gap-[32px] items-center w-full max-w-4xl mx-auto">
        <h1 className="text-center text-3xl font-bold md:text-4xl">
          Curiosity Kindler
        </h1>
        <p className="text-center text-lg text-gray-800 dark:text-gray-100 py-1 -mt-9 mb-2 md:text-xl">
          For those ignited by questions, not answers
          </p>
        <Tones></Tones>
        <Intensity></Intensity>
        <SearchBar></SearchBar>
        <Responses></Responses>
      </main>
    </div>
  );
}
