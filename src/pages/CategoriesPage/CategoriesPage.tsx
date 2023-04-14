import { CategoryCard } from "../../components/cards/CategoryCard/CategoryCard"
import { Loader } from "../../components/Loader/Loader"
import { useAppDispatch } from "../../hooks/hooks"
import { useGetCategories } from "../../hooks/useGetCategories"
import { chosenCategory } from "../../rdx/slices/recipesReducer"
import { CategoryProps } from "../../types"




export const CategoriesPage:React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useGetCategories();
    
    return (
        <div className="categoriesPage">
            <h1 className="categoriesPage__title">
                Categories
            </h1>
            {loading && <Loader/>}
            {categories?.length > 0 && (
                <div className="categoriesPage__list">
                    {categories.map((item: CategoryProps) => (
                        <CategoryCard 
                            name={item.name} 
                            description={item.description}
                            imagePath={item.imgPath}
                            key={item.id}
                            linkPath={`${item.name}`}
                            onSaveCategoryName={() => dispatch(chosenCategory(item.name))}
                        />
                    ))} 
                </div>
            )} 
            {error  && (
               <div className="categoriesPage__errorField">
                    <p className="categoriesPage__text"> 
                        Unable to get categories. Try later!
                    </p>
               </div>
            )}
        </div>
    )
}