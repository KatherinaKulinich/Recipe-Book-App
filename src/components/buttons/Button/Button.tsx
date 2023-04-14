import { useContext } from "react";
import { ThemeContext } from "../../../ThemeProvider";
import { Recipe } from "../../../types";

interface ButtonProps {
    buttonText: string;
    buttonType: 'button' | 'submit';
    onHandleClick?: () => void | undefined 
    onToggleRecipe?: (recipe: Recipe) => void
}

export const Button:React.FC<ButtonProps> = ({buttonText, buttonType, onHandleClick}) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <button 
            type={buttonType} 
            className="button"
            onClick={onHandleClick}
        >
            <span className={`button__front ${
                theme === 'dark' ? 'button__front--dark' : 'button__front--light'
            }`}>
                {buttonText}
            </span>
        </button>
    )
}