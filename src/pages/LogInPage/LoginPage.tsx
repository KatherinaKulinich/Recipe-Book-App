
import { FcGoogle } from "react-icons/Fc"
import { ImGithub } from "react-icons/Im"
import { FormAuth } from "../../components/Form/Form"
import { ImageBackground } from "../../components/ImageBackground/ImageBackground"
import { LogForm } from "../../components/LogForm/LogForm"
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth"



export const LoginPage:React.FC = () => {

    const {onLoginHandler, onLoginByGoogle, onLoginByGitHub, email, password, onSaveEmail, onSavePassword} = useFirebaseAuth()
 

    return (
        <ImageBackground>
            <LogForm 
                title={'Login Form'}  
                alternativeText={'Don’t have an account?'} 
                alternativeButtonText={'Register'} 
                alternativePath={"/register"}
            >
                <FormAuth 
                    emailValue={email} 
                    passwordValue={password} 
                    onSaveEmailValue={onSaveEmail} 
                    onSavePasswordValue={onSavePassword} 
                    onSendData={onLoginHandler} 
                    actionText={'Log in'}
                />
                <p className="form__text">
                    or
                </p>
                <div className="form__buttonsGroup">
                    <button 
                        type="button" 
                        className="form__button"
                        onClick={onLoginByGoogle}
                    >
                        <FcGoogle/>
                        Log in with google
                    </button>
                    <button 
                        type="button" 
                        className="form__button"
                        onClick={onLoginByGitHub}
                    >
                        <ImGithub/>
                        Log in with github
                    </button>
                </div>
            </LogForm>
        </ImageBackground>
    )
}