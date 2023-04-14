
import { message } from "antd"
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { db } from "../firebase"
import { fetchFavoritesRecipes, getFavId } from "../rdx/slices/favoritesRecipesReducer"
import { Recipe } from "../types"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useAuth } from "./useUserAuth"




export const useFavoritesRecipes = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isAuth, id : userId } = useAuth();

    let checkingRecipes = useAppSelector(state => state.favorites.favOnPage);
    const favoritesRecipes = useAppSelector(state => state.favorites.favoritesRecipes);
    let docId:string;


    useEffect(()=> {
        if (userId) {
            dispatch(fetchFavoritesRecipes(userId))
            dispatch(getFavId())
        }
    }, [dispatch, userId])





    const onAddRecipeToFav = useCallback(
        async ({ name, description, sections, tags, nutrition, instructions, renditions, created_at, user_ratings, thumbnail_url}: Recipe)=> {
        
        if (userId !== null) {
            await addDoc(collection(db, 'users', userId, 'favorites'), {
                name,
                created_at,
                sections,
                tags,
                nutrition,
                instructions,
                renditions,
                description,
                user_ratings,
                thumbnail_url
            }).then((doc) => docId = doc.id)
        }

    }, [userId])



    const onDeleteRecipeFromFav = useCallback(async(recipe: Recipe) => {

        if (userId !== null) {
            await deleteDoc(doc(db, 'users', userId, 'favorites', recipe.id));
        }

    }, [userId])




    const onToggleFavRecipe = useCallback((recipeItem:Recipe) => {

        if (isAuth && userId) {

            if (checkingRecipes.includes(recipeItem.created_at)) {

                onDeleteRecipeFromFav(recipeItem)
                message.success('Recipe removed from favorites')

                dispatch(fetchFavoritesRecipes(userId))
                dispatch(getFavId())
                return
            }

            onAddRecipeToFav(recipeItem)
            message.success('Recipe added to favorites')

            dispatch(fetchFavoritesRecipes(userId))
            dispatch(getFavId())
        
            return
        }

        navigate('/login')

    }, [dispatch, isAuth, userId])



    
    const onJustAddRecipeToFavorites = useCallback((recipeItem:any) => {

        if (isAuth) {

            if (checkingRecipes.includes(recipeItem.created_at)) {
                message.error('This recipe had been already added')
                return
            }

            onAddRecipeToFav(recipeItem)
            message.success('Recipe added to favorites')
            
            if (userId) {
                dispatch(fetchFavoritesRecipes(userId))
                dispatch(getFavId())
            }
            return
        }

        navigate('/login')

    }, [dispatch, isAuth, userId])

    




    return {
        onDeleteRecipeFromFav,
        onAddRecipeToFav,
        onToggleFavRecipe,
        onJustAddRecipeToFavorites,
        checkingRecipes,
        favoritesRecipes
    }
}
    
    
