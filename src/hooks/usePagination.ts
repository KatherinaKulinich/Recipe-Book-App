import { useState, useCallback } from "react";
import { useAppSelector } from "./hooks";

export const usePagination = () => {

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const total = useAppSelector(state => state.recipes.totalRecipes);
    const perPage = 7;
    const pagesCount = Math.ceil(total/perPage)



    const onChangePage = useCallback((page:any) => {

        if (!page) return
        setCurrentPage(page)

        const newStart = (page - 1)  * perPage + 1;
        setStart(newStart)
        
    }, [start, perPage])

    
    return {
        start,
        pagesCount, 
        onChangePage,
        currentPage,
        perPage
    }
}