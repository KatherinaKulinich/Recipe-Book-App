import { useCallback, useEffect, useState } from "react";
import { Recipe } from "../types";
import { useUserCreatedRecipes } from "./useUserCreatedRecipes";

type Sorter = (a: Recipe, b: Recipe) => number;

export const useFilter = () => {

    const [filtered, setFiltered] = useState<Recipe[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [openFilter, setOpenFilter] = useState(false);
    const [categoryValue, setCategoryValue] = useState('');

    const sortRecipes = ((array:Recipe[], sorter:Sorter) => {
        array = array.slice().sort(sorter);
        return array
    });


    const onFilterRecipes = useCallback(() => {
        setOpenFilter(!openFilter)
    }, [openFilter])



    const onChangeCategoryName  = useCallback((value:string) => {
        setSearchValue('')
        setCategoryValue(value)  
    }, [])


    const onChangeSelectValue = useCallback((value:string) => {
        setCategoryValue('')
        setSearchValue(value)
    }, [])


    const onShowFilteredRecipes = useCallback((recipesArray:Recipe[]) => {
        setFiltered(recipesArray)


        if (searchValue === 'old') {
            const sorter = (a:Recipe, b:Recipe) => {
                return a.created_at - b.created_at;
            };
            setFiltered(sortRecipes(recipesArray, sorter))
            onFilterRecipes()
            return
        }

        if (searchValue === 'new') {
            const sorter = (a:Recipe, b:Recipe) => {
                return b.created_at - a.created_at;
            };
            setFiltered(sortRecipes(recipesArray, sorter))
            onFilterRecipes()
            return
        }

        if (searchValue === 'rate') {
            const sorter = (a:Recipe, b:Recipe) => {
                return b.user_ratings.score - a.user_ratings.score;
            };
            setFiltered(sortRecipes(recipesArray, sorter))
            onFilterRecipes()
            return
        }

        if (searchValue === 'none') {
            setFiltered(recipesArray)
            onFilterRecipes()
            return
        }
        

    }, [searchValue, categoryValue])




    const onShowRecipesByCategories = useCallback((recipesArray: Recipe[]) => {
        

        if (categoryValue === 'all') {
            setFiltered(recipesArray)
            return
        }

        const newArray = recipesArray.filter((recipe:Recipe) => {
            return recipe.category === categoryValue
        })
        setFiltered(newArray)
 
        
    }, [categoryValue])
    




    return {
        setFiltered,
        onShowFilteredRecipes,
        searchValue,
        filtered,
        onChangeSelectValue,
        onFilterRecipes,
        openFilter,
        onChangeCategoryName,
        onShowRecipesByCategories,
        categoryValue
    }
}