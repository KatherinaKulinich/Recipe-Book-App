import { FormField } from "../FormField/FormField"

interface FormProps {
    emailValue: string;
    passwordValue: string;
    onSaveEmailValue:  React.ChangeEventHandler<HTMLInputElement>;
    onSavePasswordValue:  React.ChangeEventHandler<HTMLInputElement>;
    onSendData: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) => void;
    actionText: string;
}




export const FormAuth:React.FC<FormProps> = ({emailValue, passwordValue, onSaveEmailValue, onSavePasswordValue, onSendData, actionText}) => {

    const STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
    const formAction = `https://${STORAGE_BUCKET}/__/auth/action?mode=action&oobCode=code`


    return (
        <form 
            action={formAction} 
            method="post" 
            className="form"
        >
            <FormField 
                id={'userEmail'}
                inputType={'email'}
                inputPlaceholder={'Enter your email...'}
                labelText={'Email:'} 
                inputValue={emailValue} 
                onChangeHandler={onSaveEmailValue}                    
            />
            <FormField 
                id={'userPassword'}
                inputType={'password'}
                inputPlaceholder={'Enter your password...'}
                labelText={'Password:'} 
                inputValue={passwordValue} 
                onChangeHandler={onSavePasswordValue}                    
            />
            <button 
                type="submit" 
                className="form__logButton"
                onClick={(event) => onSendData(event, emailValue, passwordValue)}
            >
                {actionText}
            </button>
        </form>
    )
}