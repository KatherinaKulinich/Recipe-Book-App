import { Popconfirm, Select} from "antd";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/Fa";
import { RecipeCard } from "../../components/cards/RecipeCard/RecipeCard"
import { DrawerWindow } from "../../components/Drawer/Drawer";
import { useAppDispatch, useAppSelector  } from "../../hooks/hooks";
import { chosenCategory, chosenRecipe } from "../../rdx/slices/recipesReducer";
import { Loader } from "../../components/Loader/Loader";
import { useUserCreatedRecipes } from "../../hooks/useUserCreatedRecipes";
import { useCallback, useEffect, useState } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton/RoundedButton";
import { FilterButton } from "../../components/buttons/FilterButton/FilterButton";
import { useFilter } from "../../hooks/useFilter";
import { useGetCategories } from "../../hooks/useGetCategories";
import { ModalForEditing } from "../../components/ModalForEditing/ModalForEditing";
import { useEditRecipe } from "../../hooks/useEditRecipe";
import { Recipe } from "../../types";





export const MyRecipesPage: React.FC = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.created.loading);
    const error = useAppSelector(state => state.created.errorMessage);

    const { userRecipes, onChangeFiles, onDeleteRecipe, fileList, onUploadRecipe } = useUserCreatedRecipes();
    const { searchValue, setFiltered, onShowFilteredRecipes, filtered, onChangeSelectValue, onFilterRecipes, openFilter, onChangeCategoryName, onShowRecipesByCategories, categoryValue } = useFilter()
    const { categories } = useGetCategories()
    const { isModalOpen, onCloseModal, onOpenModal, onSaveRecipeChanges, recipeToEdit } = useEditRecipe();


    const options = categories.map((item:any) => {
            return {
                value: item.name,
                label: item.name
            }
        }).concat({
            value: 'all',
            label: 'all'
        })
 

    useEffect(() => {
        setFiltered(userRecipes)

        if (categoryValue !== '') {
            onShowRecipesByCategories(userRecipes)
            return
        }
        if (searchValue !== '') {
            onShowFilteredRecipes(userRecipes)
            return
        }
        
    }, [userRecipes, searchValue, categoryValue])



    const showDrawer = useCallback(() => {
        setOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);



    const onFinish = (values:any) => {
        onUploadRecipe(values);
        onClose()
        setFiltered(userRecipes)
    }

    const onShowRecipeDetails = useCallback((item:Recipe) => {
        dispatch(chosenRecipe(item))
        dispatch(chosenCategory(''))
    },[])
  
    

    return (
            <>
                <div className="myRecipes">
                    <div className="myRecipes__header">
                        <Select
                            defaultValue="all"
                            value={categoryValue !== '' ? categoryValue : 'all'}
                            style={{ width: 150 }}
                            onChange={onChangeCategoryName}
                            options={options}
                            className='myRecipes__categoriesFilter'
                        />
                        <h1 className="myRecipes__title">
                            My Recipes
                        </h1> 
                        <div className="myRecipes__controlButtons">
                            <RoundedButton 
                                hoverTitle={"Create new recipe"} 
                                buttonClassName={"myRecipes__button"} 
                                onClickHandle={showDrawer} 
                            >
                                <span>
                                    <IconContext.Provider value={{ color: "#DCCA87", size: "36" }}>
                                        <FaPlus/>
                                    </IconContext.Provider>
                                </span>
                            </RoundedButton>
                            <FilterButton 
                                onClickHandle={onFilterRecipes} 
                                openFilter={openFilter}
                                onSelectValue={onChangeSelectValue}
                                rate={false}
                                currentFilterValue={searchValue}
                            />
                        </div>
                    </div>
                    <div className="myRecipes__list">
                        {loading && <Loader/>}
                        { filtered?.length > 0 && (
                                filtered.map((item:any) => (
                                    <div 
                                        className="myRecipes__item"
                                        key={`${item.id}${item.name}`}
                                    >
                                        <RecipeCard 
                                            onSaveRecipe={() => onShowRecipeDetails(item)}
                                            recipeName={item.name}
                                            recipeImagePath={item.thumbnail_url}
                                            recipeRate={item.user_ratings?.score}
                                            recipeTags={item.tags}
                                            recipeDate={item.created_at}
                                            recipeNutrition={Object.keys(item.nutrition).length !== 0 ? item.nutrition : ''}
                                            linkPath={`${item.name}`} 
                                            key={`${item.id}${item.name}`}
                                        >
                                            <div className="recipeCard__control">
                                                <button onClick={() => onOpenModal(item)}>
                                                    Edit 
                                                </button>
                                                <Popconfirm
                                                    placement="topRight"
                                                    title={'Delete this recipe'}
                                                    description={'Are you sure to delete this recipe?'}
                                                    onConfirm={()=> onDeleteRecipe(item.id)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <button> 
                                                        Delete
                                                    </button>
                                                </Popconfirm>
                                            </div>
                                        </RecipeCard>
                                    </div>
                                ))
                            )
                        }
                        {userRecipes?.length > 0 && filtered?.length === 0 && (
                            <div>
                                <p className="myRecipes__text"> 
                                    There are no recipes for this search!
                                </p>
                            </div>
                        )}
                        {userRecipes?.length === 0 && loading === false && (
                            <div>
                                <p className="myRecipes__text"> 
                                    You don't have any own recipes. Create your first recipe now!
                                </p>
                            </div>
                        )}
                        {error && (
                            <div>
                                <p className="myRecipes__text"> 
                                    An error has occurred! Try later.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <DrawerWindow 
                    onOpen={open} 
                    onClose={onClose}
                    onFinish={onFinish}
                    onChangeImg={onChangeFiles}
                    fileList={fileList}
                />
                <ModalForEditing 
                    onCloseModal={onCloseModal} 
                    onSaveChanges={onSaveRecipeChanges} 
                    isModalOpen={isModalOpen} 
                    recipeToEdit={recipeToEdit}
                />
            </>
        )

}
    

                    


