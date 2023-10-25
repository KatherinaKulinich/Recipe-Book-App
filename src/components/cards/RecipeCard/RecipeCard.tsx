import { Rate, Tooltip } from "antd";
import { MouseEventHandler, useContext } from "react";
import { ThemeContext } from "../../../ThemeProvider";
import { Tag } from "../../Tag/Tag";
import { FaNutritionix } from 'react-icons/Fa'
import { RxCalendar } from 'react-icons/Rx'
import { IconContext } from "react-icons";
import { ButtonDetails } from "../../buttons/ButtonDetails/ButtonDetails";
import defaultImage from '../../../assets/images/defaultRecipeImage.jpg';
import { Recipe, RecipeImagesPath, RecipeNutrition, RecipeRate, RecipeTag } from "../../../types";


interface RecipeCardProps {
    onSaveRecipe: () => void;
    recipeName: string;
    recipeImagePath: RecipeImagesPath;
    recipeRate: RecipeRate;
    recipeTags: RecipeTag[];
    recipeDate: number;
    recipeNutrition: RecipeNutrition | undefined | null;
    linkPath: string;
    onToggleFavRecipe?: MouseEventHandler<HTMLDivElement> 
    tooltipText?: string;
    flagStyle?: string;
    children?: React.ReactNode
}




export const RecipeCard:React.FC<RecipeCardProps> = 
    ({onSaveRecipe, recipeName, recipeImagePath, recipeRate, recipeTags, recipeDate, recipeNutrition, linkPath, onToggleFavRecipe, tooltipText, flagStyle, children}) => {

    const { theme } = useContext(ThemeContext);
    const visibleTags = recipeTags?.slice(0, 3);


    
    return (
        <div className="recipeCard">
            <div 
                className="recipeCard__main"
                onClick={onSaveRecipe}
            >
                <div className={`recipeCard__front ${
                    theme === 'dark' ? 'recipeCard__front--dark' : 'recipeCard__front--light'
                }`}>
                    <div className="recipeCard__image">
                        <img 
                            src={
                                Array.isArray(recipeImagePath) ? 
                                recipeImagePath.length !== 0 ? 
                                recipeImagePath[0] : 
                                defaultImage  : 
                                recipeImagePath
                            } 
                            alt={`${recipeName} image`} 
                        />
                    </div>
                    <div className="recipeCard__content">
                        {recipeRate && (
                            <Rate 
                                disabled 
                                allowHalf 
                                defaultValue={recipeRate && recipeRate !== null ? recipeRate.score * 5 : 0} 
                                style={{color: '#D1B464'}}
                            />
                        )}
                        <div className="recipeCard__titleContainer">
                            <h3 className="recipeCard__title">
                                {recipeName}
                            </h3>
                        </div>
                        <div className="recipeCard__tagsList">
                            {recipeTags?.length > 0 && (
                                visibleTags.map((item:RecipeTag) => (
                                    <Tag 
                                        tagName={item.display_name}
                                        key={item.id} 
                                        tagRequest={item.name}                                    
                                    />
                                ))
                            )}
                        </div>
                        <ButtonDetails 
                            linkPath={linkPath} 
                            onHandleClick={onSaveRecipe} 
                            buttonText={"See all details"}
                        />
                        <div className="recipeCard__created">
                            <div>
                                <IconContext.Provider value={{ color: "#9f7928" }}>
                                    <RxCalendar/>
                                </IconContext.Provider>
                                <p className="recipeCard__created-text">
                                    {new Date(recipeDate).toLocaleDateString()}
                                </p>
                            </div>
                            <Tooltip 
                                    title='calories/protein/fat/carbohydrates'
                                    placement="bottomRight" 
                                    color={'#5d4a1f'}
                            >
                                <div>
                                    <IconContext.Provider value={{ color: "#9f7928" }}>
                                        <FaNutritionix/>
                                    </IconContext.Provider>
                                    {recipeNutrition ? (
                                        <p className="recipeCard__created-text">
                                            {`${recipeNutrition.calories}/${recipeNutrition.protein}/${recipeNutrition.fat}/${recipeNutrition.carbohydrates}`}
                                        </p>
                                    ) : (
                                        <p className="recipeCard__created-text">
                                            -/-/-/-
                                        </p>
                                    )}
                                </div>
                            </Tooltip>
                        </div>
                        {children}
                        {recipeRate && (
                            <Tooltip 
                                title={tooltipText} 
                                placement="bottomRight" 
                                color={'#5d4a1f'}
                            >
                                <div 
                                    className={`recipeCard__flag ${flagStyle}`}
                                    onClick={onToggleFavRecipe}
                                >
                                    <svg 
                                        version="1.1" 
                                        x="0px" 
                                        y="0px" 
                                        viewBox="0 0 32 32"
                                    >
                                        <path  
                                            d="M21.3,28.3L16,23l-5.3,5.3C10.1,28.9,9,28.5,9,27.6V5c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v22.6 C23,28.5,21.9,28.9,21.3,28.3z" 
                                            fill="transparent" 
                                            stroke="#9f7928"
                                        />
                                    </svg>
                                </div>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}