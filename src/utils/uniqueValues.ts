import { Recipe } from "../types";


export const getUniqueValues = (array: Recipe[]) => {
    
    const setRec = new Set();
    const uniqueValues = array.filter((item:any) => {
        const duplicate = setRec.has(item.id);
        setRec.add(item.id);

        return !duplicate;
    });

    return uniqueValues;
}