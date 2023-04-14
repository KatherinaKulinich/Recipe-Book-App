import { Input} from 'antd';
import { NavList } from '../../NavList/NavList';
import { useCallback} from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { chosenCategory, fetchRecipes } from '../../../rdx/slices/recipesReducer';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../../../hooks/usePagination';


const { Search } = Input;


export const Navigation: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { start } = usePagination()



    const onSearchRecipe = useCallback((value:string) => {
        dispatch(fetchRecipes(`q=${value}`, start))
        dispatch(chosenCategory(''))
        navigate('/recipeslist')

    }, [dispatch])

    
    return (
        <div className="navigation">
            <NavList listClass={'navigation__list'}/>
            <Search 
                placeholder="Enter a recipe name" 
                allowClear 
                onSearch={onSearchRecipe} 
                style={{ width: 220}} 
                className='navigation__search'
            />
        </div>
    )
}