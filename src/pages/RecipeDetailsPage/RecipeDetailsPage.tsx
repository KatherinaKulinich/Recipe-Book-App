import video1 from '../../assets/video/video1.mp4';
import video2 from '../../assets/video/video2.mp4';
import video3 from '../../assets/video/video3.mp4';
import video4 from '../../assets/video/video4.mp4';
import video5 from '../../assets/video/video5.mp4';
import video6 from '../../assets/video/video6.mp4';

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RecipeDetails } from "../../components/RecipeDetails/RecipeDetails";
import { useEffect } from 'react';
import { useFavoritesRecipes } from '../../hooks/useFavoritesRecipes';
import { useAuth } from '../../hooks/useUserAuth';
import { fetchFavoritesRecipes, getFavId } from '../../rdx/slices/favoritesRecipesReducer';
import { Recipe } from '../../types';
import { getRandomVideo } from '../../utils/randomValues';

const videos = [video1, video2, video3, video3, video4, video5, video6];



export const RecipeDetailsPage:React.FC = () => {

    const dispatch = useAppDispatch();
    const { onJustAddRecipeToFavorites, checkingRecipes } = useFavoritesRecipes();
    const { id : userId } = useAuth();

    const selectedCategory = useAppSelector(state => state.recipes.category);
    const selectedRecipe:Recipe = useAppSelector(state => state.recipes.recipe);



    useEffect(()=> {
        userId && dispatch(fetchFavoritesRecipes(userId))
        dispatch(getFavId())
    }, [dispatch, userId])


    return (
        <>
            {selectedRecipe && (
                <RecipeDetails 
                    recipeCategory={selectedCategory}
                    recipeName={selectedRecipe?.name}
                    recipeRate={selectedRecipe?.user_ratings}
                    recipeImagePath={selectedRecipe?.thumbnail_url}
                    recipeTags={selectedRecipe.tags}
                    recipeIngredients={selectedRecipe.sections}
                    recipeNutrition={selectedRecipe.nutrition}
                    recipeDate={selectedRecipe?.created_at}
                    recipeDescription={selectedRecipe?.description ? selectedRecipe.description : 'This recipe does not contain a description.'}
                    recipeVideo={selectedRecipe?.renditions ? selectedRecipe.renditions[0].url : getRandomVideo(videos)}
                    recipeInstructions={selectedRecipe?.instructions} 
                    toogleFavRecipe={() => onJustAddRecipeToFavorites(selectedRecipe)}  
                    buttonText={checkingRecipes.includes(selectedRecipe.created_at) ? 'In favorites' : 'Add to favorites'}              
                />
            )}
        </>
    )
}