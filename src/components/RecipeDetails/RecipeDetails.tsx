import { Rate, Carousel, Image, Tooltip} from "antd";
import {  useContext } from "react";
import { IconContext } from "react-icons";
import { FaNutritionix } from "react-icons/Fa";
import { GiHotMeal } from "react-icons/Gi";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeProvider";
import { BonAppetitSection } from "../BonAppetitSection/BonAppetitSection";
import { Button } from "../buttons/Button/Button";
import { Tag } from "../Tag/Tag";
import { RxCalendar } from 'react-icons/Rx'
import { useGoBack } from "../../hooks/useGoBack";
import defaultImage from '../../assets/images/defaultRecipeImage.jpg';
import { Recipe, RecipeComponent, RecipeComponentUser, RecipeImagesPath, RecipeInstruction, RecipeNutrition, RecipeRate, RecipeSection, RecipeTag } from "../../types";




interface RecipeDetailsProps {
    recipeCategory: string;
    recipeName: string;
    recipeRate: RecipeRate;
    recipeImagePath: RecipeImagesPath;
    recipeTags: RecipeTag[];
    recipeIngredients: RecipeSection[] | RecipeComponentUser[];
    recipeNutrition: RecipeNutrition | undefined | null;
    recipeDate: number;
    recipeDescription: string;
    recipeVideo: string;
    recipeInstructions: RecipeInstruction[];
    toogleFavRecipe:  (recipe: Recipe) => void;
    buttonText: string;
}




export const RecipeDetails:React.FC<RecipeDetailsProps> = 
    ({recipeCategory, recipeName, recipeRate, recipeImagePath, recipeTags, recipeNutrition, recipeDate, recipeIngredients, recipeDescription, recipeVideo, recipeInstructions, toogleFavRecipe, buttonText}) => {

    const { theme } = useContext(ThemeContext);
    const { goBack } = useGoBack();

    

    
    return (
        <>
            <div className={`recipeDetails ${
                theme === 'dark' ? 'recipeDetails--dark' : 'recipeDetails--light'
            } `}>
                <div className="recipeDetails__mainInfo">
                    { recipeCategory !== '' ? (
                        <Link 
                            to={"/categories/:categoryName"} 
                            className="recipeDetails__category"
                        >
                            {`${recipeCategory} category`}
                        </Link>
                    ) : (
                        <h3 
                            className="recipeDetails__category"
                            onClick={goBack}
                        >
                            Go back
                        </h3>
                    )}
                    <h2 className="recipeDetails__recipeName">
                        {recipeName}
                    </h2>
                </div>
                {recipeRate && (
                    <Rate 
                        style={{color: '#D1B464'}} 
                        disabled 
                        allowHalf 
                        defaultValue={recipeRate ? recipeRate.score * 5 : 0} 
                    />
                )}
                <div className="recipeDetails__content">
                    <div className="recipeDetails__header">
                        {Array.isArray(recipeImagePath) ? recipeImagePath.length !== 0 ? (

                            <Carousel   
                                autoplay
                                className="recipeDetails__carousel"
                            >
                                {recipeImagePath.map((image: string) => (
                                    <Image 
                                        src={image} 
                                        className='recipeDetails__image'
                                        key={image}
                                    />
                                ))}
                            </Carousel>
                        ) : (
                            <Image 
                                src={defaultImage} 
                                className='recipeDetails__image'
                            />

                        ) : (
                            <Image 
                                src={recipeImagePath} 
                                className='recipeDetails__image'
                            />
                        )}
                        <div className='recipeDetails__tagsList'>
                           {recipeTags?.length > 0 && (
                                recipeTags.map((item:RecipeTag) => (
                                    <Tag 
                                        tagName={item.display_name}
                                        key={item.id} 
                                        tagRequest={item.name}                                    
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className='recipeDetails__description'>
                        <div className='recipeDetails__information'>
                            <Tooltip 
                                    title='calories/protein/fat/carbohydrates'
                                    placement="bottomRight" 
                                    color={'#5d4a1f'}
                            >
                                <div>
                                    <IconContext.Provider value={{ color: "#9f7928" }}>
                                        <FaNutritionix/>
                                    </IconContext.Provider>
                                    {recipeNutrition && Object.keys(recipeNutrition).length !== 0 ? (
                                        <p className="recipeDetails__created-text">
                                            {`${recipeNutrition.calories}/${recipeNutrition.protein}/${recipeNutrition.fat}/${recipeNutrition.carbohydrates}`}
                                        </p>
                                    ) : (
                                        <p className="recipeDetails__created-text">
                                            -/-/-/-
                                        </p>
                                    )}
                                </div>
                            </Tooltip>
                            {recipeRate && (
                                <Button 
                                    buttonText={buttonText} 
                                    buttonType={"button"}
                                    onToggleRecipe={toogleFavRecipe}
                                />
                           )}
                            <div>
                                <IconContext.Provider value={{ color: "#9f7928" }}>
                                    <RxCalendar/>
                                </IconContext.Provider>
                                <p className="recipeDetails__created-text">
                                    {new Date(recipeDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="recipeDetails__contentBlock">
                            <div className="recipeDetails__contentColumn">
                                <h4 className="recipeDetails__subtitle">
                                    Ingredients
                                </h4>
                                <ul className="recipeDetails__contentList">
                                    {recipeIngredients && (
                                        recipeIngredients.map((item:any) => (
                                            Array.isArray(item.components) ? 
                                                item.components.map((i:RecipeComponent) => (
                                                    <li 
                                                        className="recipeDetails__ingredientItem" 
                                                        key={i.id}
                                                    > 
                                                        <IconContext.Provider value={{ color: "#DCCA87", size: "36" }}>
                                                            <GiHotMeal/>
                                                        </IconContext.Provider>
                                                        <span>
                                                            {i.raw_text}
                                                        </span>
                                                    </li>
                                                
                                                )) : ( 
                                                        <li 
                                                            className="recipeDetails__ingredientItem" 
                                                            key={item.components.id}
                                                        > 
                                                            <IconContext.Provider value={{ color: "#DCCA87", size: "36" }}>
                                                                <GiHotMeal/>
                                                            </IconContext.Provider>
                                                            <span>
                                                                {item.components.raw_text}
                                                            </span>
                                                        </li>
                                                    )
                                        ))
                                    )}
                                </ul>
                            </div>
                            <div className="recipeDetails__separator"></div>
                            <div className="recipeDetails__contentColumn">
                                <h4 className="recipeDetails__subtitle">
                                    Description
                                </h4>
                                <p className="recipeDetails__recipeDescription">
                                    {recipeDescription}
                                </p>
                            </div>
                        </div>
                        <div className="recipeDetails__contentBlock">
                            <div className="recipeDetails__contentColumn">
                                <video  
                                    width={'300px'} 
                                    loop 
                                    autoPlay 
                                    muted
                                    className="recipeDetails__video"
                                >
                                    <source src={recipeVideo}/>
                                </video>
                            </div>
                            <div className="recipeDetails__contentColumn">
                                <h4 className="recipeDetails__subtitle">
                                    Process
                                </h4>
                                <ul className="recipeDetails__contentList">
                                    {recipeInstructions?.length > 0  && (
                                        recipeInstructions.map((item:any) => (
                                            <li 
                                                className="recipeDetails__stepItem" 
                                                key={item.id}
                                            >
                                                <span>
                                                    {item.position}
                                                </span>
                                               {item.display_text}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BonAppetitSection/>
        </>
    )
}