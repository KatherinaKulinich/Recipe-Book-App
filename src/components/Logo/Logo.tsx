import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import logoImage from '../../assets/svg/logoIcon.svg';

export const Logo:React.FC = () => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div className={`logo ${
            theme === 'dark' ? 'logo--dark' : 'logo--light'
        }`}>
            <img 
                src={logoImage} 
                alt="logo" 
                className="logo__icon"
            />
            <p className="logo__text">
                Your 
                <span>
                    Tasty
                </span>
                App
            </p>
        </div>
    )
}