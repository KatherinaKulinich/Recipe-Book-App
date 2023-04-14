import { FormAuth } from "../../components/Form/Form";
import { ImageBackground } from "../../components/ImageBackground/ImageBackground"
import { LogForm } from "../../components/LogForm/LogForm"
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";




export const RegisterPage:React.FC = () => {
    
    const {onRegisterHandler, email, onSaveEmail, password, onSavePassword} = useFirebaseAuth()
    
    return (
        <ImageBackground>
            <LogForm 
                title={"Register Form"} 
                alternativeText={'Have an account?'} 
                alternativeButtonText={"Log in"}
                alternativePath={'/login'}
            >
                <FormAuth 
                    emailValue={email} 
                    passwordValue={password} 
                    onSaveEmailValue={onSaveEmail} 
                    onSavePasswordValue={onSavePassword} 
                    onSendData={onRegisterHandler} 
                    actionText={'Register'}
                />
            </LogForm>
        </ImageBackground>
    )
}