import type { Joke } from "../types/joke";

export async function fetchJoke(): Promise<Joke> {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if(!res.ok){
        throw new Error('Failed to fetch joke');
    }
    return res.json();
}