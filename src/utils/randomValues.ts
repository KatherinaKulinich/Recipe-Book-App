import ShortUniqueId from "short-unique-id";


export const getRandomId = (symbols: number) => {
    const randomId = new ShortUniqueId({ length: symbols });

    return randomId;
}


export const getRandomVideo = (array: string[])  => {
   
    let randomNumber = Math.round(Math.random() * array.length)
    let video = array[randomNumber];

    return video;
}