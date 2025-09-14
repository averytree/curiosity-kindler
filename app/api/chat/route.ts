import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 
});

//Posts message to LLM
export async function POST(req: Request) {
    try {
        const { message } = await req.json()
        
        if (!message){
            return NextResponse.json({error: "No message provided"}, {status: 400});
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });

        if (!response?.text){
            return NextResponse.json({error:"Invalid response from AI"}, {status: 502});
        }
        return NextResponse.json({ reply: response.text });
    }
    catch (error) {
        console.error("API error:", error);
        return NextResponse.json({error: "Server error"}, {status:500});
    }
  ;

  

  
}