import type { Yesno } from "../types/yesno";

export async function fetchYesno(): Promise<Yesno>{
    const res = await fetch('https://yesno.wtf/api');
    if(!res.ok){
        throw new Error('Failed to fetch img');
    }
    return res.json();
}