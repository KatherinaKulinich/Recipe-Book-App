import { useContext } from "react";
import { ThemeContext } from "../../../ThemeProvider";

interface HomeCardProps {
    image: string;
    description: string;
    cardClass?: string
}

export const HomeCard:React.FC<HomeCardProps> = ({image, description, cardClass}) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`homecard ${cardClass} ${
            theme === 'dark' ? 'homecard--dark' : 'homecard--light'
        }`}>
            <img 
                src={image} 
                alt="image" 
                className="homecard__image"
            />
            <p className="homecard__text">
                {description} 
            </p>
        </div>
    )
}