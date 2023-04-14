import { Link } from "react-router-dom";
import { BackButton } from "../buttons/BackButton/BackButton";


interface LogFormProps {
    title: 'Register Form' | 'Login Form';
    children: React.ReactNode;
    alternativeText: 'Don’t have an account?' | 'Have an account?';
    alternativeButtonText: 'Log in' | 'Register';
    alternativePath: '/login' | '/register'
}



export const LogForm:React.FC<LogFormProps> = ({title, alternativeText, alternativeButtonText, alternativePath, children}) => {
   

    return (
        <div className="logForm">
            <div className="logForm__content">
                <h1 className="logForm__title">
                    {title}
                </h1>
                {children}
                <div className='logForm__switchField'>
                    <p className='logForm__text'>
                        {alternativeText}
                    </p>
                    <Link to={alternativePath}>
                        <button className='logForm__switchButton'>
                            {alternativeButtonText} 
                        </button>
                    </Link>
                </div>
                <BackButton/>
            </div>
        </div>
    )
}