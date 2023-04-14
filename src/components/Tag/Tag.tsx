import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { usePagination } from "../../hooks/usePagination";
import { fetchRecipes, chosenCategory } from "../../rdx/slices/recipesReducer";

interface TagProps {
    tagName:string;
    tagRequest: string;
}


export const Tag:React.FC<TagProps> = ({tagName, tagRequest: tagRequest}) => {
    const dispatch = useAppDispatch();
    const { start } = usePagination()

    const onTagSearch = useCallback((name:string, request:string) => {
        dispatch(fetchRecipes(`tags=${request}`, start))
        dispatch(chosenCategory(name))
    }, [dispatch, start])

    return (
        <Link 
            to={`/recipeslistbytag/${tagRequest}`} 
            className="tag"
            onClick={() => onTagSearch(tagName, tagRequest)}
        >
            {tagName}
        </Link>
    )
}