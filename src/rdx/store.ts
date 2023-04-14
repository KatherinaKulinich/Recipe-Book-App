import { configureStore } from "@reduxjs/toolkit";
import createdRecipesReducer from "./slices/createdRecipesReducer";
import favoritesRecipesReducer from "./slices/favoritesRecipesReducer";
import recipesReducer from "./slices/recipesReducer";
import userReducer from "./slices/userReducer";


const store = configureStore({
    reducer: {
        user: userReducer,
        recipes: recipesReducer,
        favorites: favoritesRecipesReducer,
        created: createdRecipesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;