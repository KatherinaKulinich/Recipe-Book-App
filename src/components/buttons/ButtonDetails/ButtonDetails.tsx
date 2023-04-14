import { Link } from "react-router-dom"

interface ButtonDetailsProps {
    linkPath: string;
    onHandleClick: () => void;
    buttonText: string
}

export const ButtonDetails:React.FC<ButtonDetailsProps> = ({buttonText, onHandleClick, linkPath}) => {
    return (
        <Link to={linkPath}>
            <button 
                type="button" 
                className="buttonDetails"
                onClick={onHandleClick}
            >
                <span 
                    className="buttonDetails__circle" 
                    aria-hidden="true"
                >
                    <span className="buttonDetails__arrow-icon"></span>
                </span>
                <span className="buttonDetails__text">
                    {buttonText}
                </span>
            </button>
        </Link>
    )
}