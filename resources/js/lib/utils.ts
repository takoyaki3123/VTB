/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function shuffle(array: Array<any>) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      const randomIndex = getRandomInt(currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function valueAsKey(arr: Array<any>, valueKey: string): any[] {
    const tmp: any[] = [];
    arr.forEach((val) => {
        if (tmp[val[valueKey]] == undefined) {
            tmp[val[valueKey]] = [val];
        } else {
            tmp[val[valueKey]].push(val);
        }
    })
    return tmp;
}