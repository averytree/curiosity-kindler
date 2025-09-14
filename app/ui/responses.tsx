'use client' 

import { useAppContext } from "../lib/AppContext";
import { useState, useEffect } from "react";


export default function Responses() {
    const {responses, responseStatus} = useAppContext();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [displayedQ, setDisplayedQ] = useState<string[]>([]);
    const [currentQ, setCurrentQ] = useState("");

    const responseList = responses.split("*");

    //If responses changes, then clear the current displayed Q's
    //TODO future implementation:  display a log of past questions
    useEffect(()=> {
        setDisplayedQ([]);
        setCurrentQ("");
        setCurrentQIndex(0);
    }, [responses])

    //Typewriter effect when responses change
    useEffect(() => {
        //All questions have been "typewritered" as are now displayed
        if (currentQIndex >= responseList.length) return;
        
        const currentQInFull = responseList[currentQIndex]
        let charIndex = 0;

        const interval = setInterval(() => {
            //Repeatedly add chars to the current typewriter question until all chars have been added
            if (charIndex < currentQInFull.length){
                setCurrentQ(currentQInFull.substring(0,charIndex+1))
                charIndex ++;
            }
            else {
                clearInterval(interval);
                setTimeout(() => {
                    //add this typewritered question to the display list
                    setDisplayedQ(prev => [...prev, currentQInFull]);
                    //prepare to typewriter the next question
                    setCurrentQ("");
                    setCurrentQIndex(i => i+1);
                }, 800)} 
            }, 20) 
        return () => clearInterval(interval);
    }, [currentQIndex, responses]);



    if (responseStatus === "empty") return (<div></div>);

    if (responseStatus === "error"){
        return (<div className="text-1xl text-center">I'm sorry, something went wrong. Please try again.</div>);
    }

    else {
        //if successful query, query input is stored in responseStatus variable 
        const questionPosed = responseStatus;
        

        return (<div className="flex flex-col max-w-4xl w-full mx-auto">
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
        </div>
        );
    }

}