import { useCallback, useEffect } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom"
import { RecipeCard } from "../../components/cards/RecipeCard/RecipeCard"
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useAuth } from "../../hooks/useUserAuth";
import { chosenRecipe, fetchRecipes, getLoading } from "../../rdx/slices/recipesReducer";
import { useFavoritesRecipes } from "../../hooks/useFavoritesRecipes";
import { fetchFavoritesRecipes, getFavId } from "../../rdx/slices/favoritesRecipesReducer";
import { FilterButton } from "../../components/buttons/FilterButton/FilterButton";
import { useFilter } from "../../hooks/useFilter";
import { Recipe } from "../../types";
import { message, Pagination } from "antd";
import { usePagination } from "../../hooks/usePagination";
import { getUniqueValues } from "../../utils/uniqueValues";




export const RecipesListPage:React.FC = () => {

    const loading = useAppSelector(state => state.recipes.loading)
    const selectedCategory = useAppSelector(state => state.recipes.category);
    const error = useAppSelector(state => state.recipes.errorMessage);
    let recipes = useAppSelector(state => state.recipes.recipes);

    const dispatch = useAppDispatch();
    const { id : userId } = useAuth();
    const { checkingRecipes, onAddRecipeToFav } = useFavoritesRecipes();
    const {categoryName} = useParams()
    const {tag} = useParams()
    const {searchValue, setFiltered, onShowFilteredRecipes, filtered, onChangeSelectValue, onFilterRecipes, openFilter} = useFilter()
    const { start, pagesCount, onChangePage, currentPage } = usePagination()
    const navigate = useNavigate();

    const uniqueRecipes = getUniqueValues(filtered)
    


    useEffect(() => {
        if (categoryName) {
            dispatch(getLoading())
            dispatch(fetchRecipes(`q=${categoryName}`, start))
            return
        }
        if (tag) {
            dispatch(getLoading())
            dispatch(fetchRecipes(`tags=${tag}`, start))
        }
    }, [dispatch, categoryName, start, tag])
    


    useEffect(()=> {

        if (userId) {
            dispatch(fetchFavoritesRecipes(userId))
        }

        setFiltered(recipes)
        onShowFilteredRecipes(recipes)
    }, [dispatch, userId, recipes, searchValue])
    


    const addRecipeToFavorites = useCallback((item:Recipe) => {

        if (userId) {
            dispatch(fetchFavoritesRecipes(userId))

            if (checkingRecipes.includes(item.created_at)) {
    
                message.error('This recipe had been already added')
                return
            }
            onAddRecipeToFav(item)
            message.success('Recipe added to favorites')
            return
        }
        navigate('/login')

    }, [userId, checkingRecipes])
    




    return (
        <div className="recipesList">
            <div className="recipesList__header">
                {selectedCategory !== '' && (
                    <Link 
                        to={`/categories`} 
                        className="recipesList__subtitle"
                    >
                        {`${selectedCategory} category`}
                    </Link>
                )}
                <h1 className="recipesList__title">
                    Recipes
                </h1>
            </div>
            <FilterButton 
                onClickHandle={onFilterRecipes} 
                openFilter={openFilter}
                onSelectValue={(e) => onChangeSelectValue(e)}
                rate={true}
                currentFilterValue={searchValue}
            />
            <div className="recipesList__list">
                {loading && <Loader/>}
                { recipes?.length > 0 && (
                    uniqueRecipes.map((item:any) => (
                        <div 
                            className="recipesList__item"
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
                                onToggleFavRecipe={() => addRecipeToFavorites(item)}  
                                tooltipText={checkingRecipes.includes(item.created_at) ? 'added' : 'add recipe to favorites'}   
                                flagStyle={checkingRecipes.includes(item.created_at) ?  'recipeCard__flag--added' : ''}                           
                            />
                        </div>
                    ))
                )}
            </div>
            {error &&  (
                <div className="recipesList__errorField">
                    <p className="recipesList__text"> 
                        An error has occurred! Try later.
                    </p>
                </div>
            )}
            {loading === false && (
                <Pagination 
                    defaultCurrent={1} 
                    total={pagesCount} 
                    onChange={onChangePage}
                    current={currentPage}
                    simple
                />
            )}
        </div>
    )
}