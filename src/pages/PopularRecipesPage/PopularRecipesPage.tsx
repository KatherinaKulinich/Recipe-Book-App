import { Pagination } from "antd";
import { useCallback, useEffect } from "react";
import { FilterButton } from "../../components/buttons/FilterButton/FilterButton";
import { RecipeCard } from "../../components/cards/RecipeCard/RecipeCard"
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useFavoritesRecipes } from "../../hooks/useFavoritesRecipes";
import { useFilter } from "../../hooks/useFilter";
import { usePagination } from "../../hooks/usePagination";
import { chosenRecipe, fetchRecipes  } from "../../rdx/slices/recipesReducer";
import { Recipe } from "../../types";
import { getUniqueValues } from "../../utils/uniqueValues";




export const PopularRecipesPage:React.FC = () => {
    
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(state => state.recipes.recipes);
    const loading = useAppSelector(state => state.recipes.loading);
    const errorMessage = useAppSelector(state => state.recipes.errorMessage);

    const { onToggleFavRecipe, checkingRecipes } = useFavoritesRecipes();
    const { searchValue, setFiltered, onShowFilteredRecipes, filtered, onChangeSelectValue, onFilterRecipes, openFilter} = useFilter()
    const { start, pagesCount, onChangePage, currentPage } = usePagination()
    
    const popular = recipes.filter((item:any) => (item.user_ratings?.score >= 0.85));
    const uniqueRecipes = getUniqueValues(filtered)


    useEffect(() => {
        dispatch(fetchRecipes('', start))
    },[dispatch, start])
    
    useEffect(()=> {
        filterRecipes()
    }, [recipes, searchValue])


    const filterRecipes = useCallback(() => {
        setFiltered(popular)
        onShowFilteredRecipes(popular)
    }, [popular])



    return (
            <div className="popular">
                <h1 className="popular__title">
                    Popular Recipes
                </h1>
                 <FilterButton 
                    onClickHandle={onFilterRecipes} 
                    openFilter={openFilter}
                    onSelectValue={(e) => onChangeSelectValue(e)}
                    rate={true}
                    currentFilterValue={searchValue}
                />
                <div className="popular__list">
                    {loading && <Loader/>}
                    {
                        recipes?.length > 0 && (
                            uniqueRecipes.map((item:any) => (

                                <div 
                                    className="popular__item" 
                                    key={item.id}
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
                                        tooltipText={checkingRecipes.includes(item.created_at) ? 'added' : 'add recipe to favorites'}   
                                        flagStyle={checkingRecipes.includes(item.created_at) ?  'recipeCard__flag--added' : ''}                                    
                                    />
                                </div>
                            ))
                        )
                    }
                    {errorMessage &&  (
                        <div>
                            <p className="popular__text"> 
                                An error has occurred! Try later.
                            </p>
                        </div>
                    )}
                </div>
                <Pagination 
                    defaultCurrent={1} 
                    total={pagesCount} 
                    onChange={onChangePage}
                    current={currentPage}
                    simple
                />
            </div>
    )
}