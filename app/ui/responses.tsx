'use client' 

import { useAppContext } from "../lib/AppContext";

//empty, populated, error

export default function Responses() {
    const {responses, responseStatus} = useAppContext();


    return <p>
        {responses}
    </p>

}