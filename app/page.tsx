import Image from "next/image";
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
        <p className="text-center text-lg text-gray-100 py-1 -mt-9 mb-2 md:text-xl">
          For those ignited by questions, not answers
          </p>
        <Tones></Tones>
        <Intensity></Intensity>
        <SearchBar></SearchBar>
        <Responses></Responses>

      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
