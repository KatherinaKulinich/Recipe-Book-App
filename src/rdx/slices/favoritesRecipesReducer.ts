import { Action, AnyAction, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Recipe } from "../../types";
import { RootState } from "../store";





interface FavoritesRecipesState {
    favoritesRecipes: Recipe[];
    favOnPage: number[];
    loading: boolean;
    errorMessage: string;
    
}



const initialState: FavoritesRecipesState = {
    favoritesRecipes: [],
    favOnPage: [],
    loading: true,
    errorMessage: ''
};




const favoritesRecipesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        getFavorites(state, action: PayloadAction<any>) {
            state.favoritesRecipes = action.payload
            state.loading = false
        },
        getFavId(state) {
            state.favoritesRecipes.map((item) => {
                state.favOnPage.push(item.created_at)
            })
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
            state.loading = false
        }
    },
});




export const fetchFavoritesRecipes = (userId: string) => {

    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        let querySnapshot;

        try {
            querySnapshot = await getDocs(collection(db, "users", userId, 'favorites'));
            
        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
            return
        }
        
        dispatch(getFavorites((querySnapshot.docs.map(doc => ({
                id:doc.id,...doc.data() 
            })))))
    }
}



export const { getFavorites, getFavId, getErrorMessage } = favoritesRecipesSlice.actions;

export default favoritesRecipesSlice.reducer;

