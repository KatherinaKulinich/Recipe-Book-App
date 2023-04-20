
import { useEffect } from "react";
import { FilterButton } from "../../components/buttons/FilterButton/FilterButton";
import { RecipeCard } from "../../components/cards/RecipeCard/RecipeCard"
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useFavoritesRecipes } from "../../hooks/useFavoritesRecipes";
import { useFilter } from "../../hooks/useFilter";
import { chosenRecipe } from "../../rdx/slices/recipesReducer";
import { Recipe } from "../../types";
import { getUniqueValues } from "../../utils/uniqueValues";



export const FavoritesRecipesPage:React.FC = () => {
    const dispatch = useAppDispatch();
    const { onToggleFavRecipe, checkingRecipes, favoritesRecipes } = useFavoritesRecipes();
    const {searchValue, setFiltered, onShowFilteredRecipes, filtered, onChangeSelectValue, onFilterRecipes, openFilter} = useFilter()
    const loading = useAppSelector(state => state.favorites.loading);
    const errorMessage = useAppSelector(state => state.favorites.errorMessage);
    const uniqueRecipes = getUniqueValues(filtered)


    useEffect(() => {
        setFiltered(favoritesRecipes)
        onShowFilteredRecipes(favoritesRecipes)
    }, [favoritesRecipes, searchValue, checkingRecipes])


    
    return (
        <div className="favorites">
            <h1 className="favorites__title">
                Favorites Recipes
            </h1>
            <FilterButton 
                onClickHandle={onFilterRecipes} 
                openFilter={openFilter}
                onSelectValue={(e) => onChangeSelectValue(e)}
                rate={true}
                currentFilterValue={searchValue}
            />
            <div className="favorites__list">
                {loading && <Loader/>}
                {
                    favoritesRecipes?.length > 0 && (
                        uniqueRecipes.map((item:any) => (
                            <div 
                                className="favorites__item"
                                key={`${item.id}${item.name}`}
                            >
                                <RecipeCard 
                                    onSaveRecipe={() => dispatch(chosenRecipe(item))}
                                    recipeName={item.name}
                                    recipeImagePath={item.thumbnail_url}
                                    recipeRate={item.user_ratings}
                                    recipeTags={item.tags}
                                    recipeDate={item.created_at}
                                    recipeNutrition={Object.keys(item.nutrition).length !== 0 ? item.nutrition : ''}
                                    linkPath={`${item.name}`} 
                                    onToggleFavRecipe={() => onToggleFavRecipe(item)}  
                                    tooltipText={checkingRecipes.includes(item.created_at) ? 'delete recipe from favorites' : 'add recipe to favorites'}   
                                    flagStyle={checkingRecipes.includes(item.created_at) ? 'recipeCard__flag--added' : ''}                           
                                />
                            </div>
                        ))
                    )
                }
            </div>
            {errorMessage &&  (
                <div>
                    <p className="favorites__text"> 
                        An error has occurred! Try later.
                    </p>
                </div>
            )}
            {loading === false && favoritesRecipes.length === 0 && (
                <div>
                    <p className="favorites__text"> 
                        There are no saved recipes at the moment.
                    </p>
                </div>
            )}
        </div>
    )
}