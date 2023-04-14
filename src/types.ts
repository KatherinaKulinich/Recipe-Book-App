import { Action, ThunkDispatch } from "@reduxjs/toolkit";

export type RecipeNutrition = {
    calories: number;
    fat: number;
    protein: number;
    carbohydrates: number;
    [key:string]: number | string;
}

export type RecipeTag = {
    name: string;
    id: number;
    display_name: string;
    type?: string;
}

export type RecipeSection = {
    components: RecipeComponent[];
    [key:string]: any;
}

export type RecipeComponent = {
    id: number | string;
    raw_text: string;
    [key:string]: any;
}

export type RecipeInstruction = {
    id: number | string;
    position: number;
    display_text: string;
}

export type RecipeRate = {
    count_positive: number;
    count_negative: number;
    score: number;
}

export type RecipeComponentUser = {
    components: {
        id: string;
        raw_text: string;
    }
}

export type RecipeImagesPath = string | string[];



export interface Recipe {
    id: string;
    name: string;
    created_at: number;
    description?: string;
    thumbnail_url: RecipeImagesPath;
    category?: string;
    nutrition?: RecipeNutrition | null ;
    tags: RecipeTag[];
    sections: RecipeSection[] | RecipeComponentUser[];
    instructions: RecipeInstruction[];
    user_ratings: RecipeRate;
    [key: string]: any;
}



export interface CategoryProps {
    id: string;
    name: string;
    description: string;
    imgPath: string;
}

export type ThunkAction<R, S, E, A extends Action > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R