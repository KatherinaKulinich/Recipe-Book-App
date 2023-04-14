import { Action, AnyAction, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Recipe } from "../../types";
import { RootState } from "../store";




interface CreatedRecipesState {
    createdRecipes: Recipe[];
    createdRecipesByCategory: Recipe[]; 
    loading: boolean;
    errorMessage: string;
}

const initialState: CreatedRecipesState = {
    createdRecipes: [],
    createdRecipesByCategory: [],
    loading: true,
    errorMessage: '',
};




const createdRecipesSlice = createSlice({
    name: "created",
    initialState,
    reducers: {
        getCreatedRecipes(state, action: PayloadAction<any>) {
            state.loading = true;
            state.createdRecipes = action.payload;
            state.loading = false
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
            state.loading = false;
        }
    },
});


export const fetchUserRecipes = (userId: string) => {

    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {
       
        let querySnapshot;

        try {
            querySnapshot = await getDocs(collection(db, "users", userId, 'created'))
            
        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
            return
        }

        dispatch(getCreatedRecipes((querySnapshot.docs.map(doc => ({
                id:doc.id,...doc.data()   
            })))))
    }
}



export const {getCreatedRecipes, getErrorMessage } = createdRecipesSlice.actions;

export default createdRecipesSlice.reducer;

