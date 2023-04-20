import { Action, AnyAction, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Recipe } from "../../types";
import { RootState } from "../store";

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const RAPID_API_HOST = import.meta.env.VITE_RAPID_API_HOST;

const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST
        }
    };




interface RecipesState {
    recipes: Recipe [];
    category: string;
    errorMessage: string;
    recipe: Recipe;
    loading: boolean;
    totalRecipes: number;
}

interface fetchProps {
    categoryName: string;
    start: number;
    finish: number;
}

const initialState: RecipesState = {
    recipes : [],
    category: '',
    errorMessage: '',
    recipe: {
        id: '',
        name: '',
        created_at: 0,
        description: '',
        thumbnail_url: '',
        category: '',
        nutrition: null,
        tags: [],
        sections: [],
        instructions: [],
        user_ratings: {
            count_positive: 0,
            count_negative: 0,
            score: 0,
        },
    },
    loading: true,
    totalRecipes: 0,
};



const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        getRecipes(state, action: PayloadAction<any>) {
            state.recipes = action.payload;
            state.loading = false;
        },
        getLoading(state) {
            state.recipes = [];
            state.loading = true;
        },
        chosenCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        },
        chosenRecipe(state, action: PayloadAction<Recipe>) {
            state.recipe = action.payload
        },
        getError(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        getTotalRecipes(state, action: PayloadAction<number>) {
            state.totalRecipes = action.payload
        }
    },
});




export const fetchRecipes = (request:string, start:number) => {

    return (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        fetch(`https://tasty.p.rapidapi.com/recipes/list?from=${start}&size=7&${request}`, options)
        .then(response => response.json())
        .then(data => {

            const recipesList = data.results
            const total = data.count
            const recipes = recipesList.map((item:any) => {
                if (item.hasOwnProperty('recipes')) {
                   return item.recipes
                }
                return item
            }).flat()

            dispatch(getRecipes(recipes))
            dispatch(getTotalRecipes(total))
        })
        .catch(error => {
            dispatch(getError(error.message));
        })
    }
}





export const { getRecipes, chosenCategory, getError, chosenRecipe, getTotalRecipes, getLoading} = recipesSlice.actions;
export default recipesSlice.reducer;

