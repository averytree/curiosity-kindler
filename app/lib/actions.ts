import { Option, introBlurb } from "./definitions";

//Translates Options[] structure of Tone/Intensity into a string to feed to the LLM
function strOfChosenOptions(options: Option[], name: string) {
    const filteredOptions = options.filter(o => o.isSelected).map(o => o.name);
    return `${name}: ${filteredOptions.join(', ')}. `
}

//Formulates the message to the LLM
export function formulateMessage(tone: Option[], intensities: Option[], query: string) {
    const toneBlurb = strOfChosenOptions(tone, "Tone");
    const intensityBlurb = strOfChosenOptions(intensities, "Intensities");
    const queryBlurb = `The text input is: ${query}.`
    return introBlurb + toneBlurb + intensityBlurb + queryBlurb
}

//API call to LLM
export async function queryAPI(info: string): Promise<string> {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: info }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Unknown error");
    }

    const data = await res.json();
    return data.reply;
}
