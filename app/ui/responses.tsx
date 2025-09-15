'use client'

import { useAppContext } from "../lib/AppContext";
import { useState, useEffect, useRef } from "react";


export default function Responses() {
    const { responses, responseStatus } = useAppContext();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [displayedQ, setDisplayedQ] = useState<string[]>([]);
    const [currentQ, setCurrentQ] = useState("");
    const bottomRef = useRef<HTMLDivElement | null>(null);


    //If responses changes, then clear the current displayed Q's
    //TODO future implementation:  display a log of past questions
    useEffect(() => {
        setDisplayedQ([]);
        setCurrentQ("");
        setCurrentQIndex(0);
    }, [responses])

    //Autoscrolls to keep questions in view as typewriter adds text
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayedQ, currentQ]);

    //Typewriter effect when responses change
    useEffect(() => {
        const responseList = responses.split("*");

        //Return if all questions have been "typewritered" as are now displayed
        if (currentQIndex >= responseList.length) return;

        const currentQInFull = responseList[currentQIndex]
        let charIndex = 0;

        //Repeatedly add chars to the current typewriter question until all chars have been added
        const interval = setInterval(() => {
            if (charIndex < currentQInFull.length) {
                setCurrentQ(currentQInFull.substring(0, charIndex + 1))
                charIndex++;
            }
            else {
                clearInterval(interval);
                setTimeout(() => {
                    //add this typewritered question to the display list
                    setDisplayedQ(prev => [...prev, currentQInFull]);
                    //prepare to typewriter the next question
                    setCurrentQ("");
                    setCurrentQIndex(i => i + 1);
                }, 1000)
            }
        }, 40)
        return () => clearInterval(interval);
    }, [currentQIndex, responses]);

    //If a query hasn't been asked or a new query is loading, clear the response container 
    if (responseStatus === "empty") return (<div></div>);

    if (responseStatus === "error") {
        return (<div className="text-1xl text-center"
            id="message-error"
            aria-live="polite">Sorry, something went wrong. Please try again.</div>);
    }

    else {
        //if successful query, query input is stored in responseStatus variable 
        const questionPosed = responseStatus;


        return (<div className="flex flex-col max-w-4xl w-full mx-auto pl-4">
            <h2 className="text-2xl font-bold text-center w-full  md:text-left mb-3">{questionPosed}</h2>
            <ul className="flex flex-col w-full">
                {displayedQ.map((response, index) => (
                    <li
                        key={index}
                        className="w-full text-left text-lg mb-5">
                        {response}
                    </li>
                ))}
                {currentQ &&
                    <li
                        key={"current-question"}
                        className="w-full text-left text-lg mb-5">
                        {currentQ}
                    </li>
                }
            </ul>
            {/* invisible anchor for scrollIntoView */}
            <div ref={bottomRef} />
        </div>
        );
    }

}