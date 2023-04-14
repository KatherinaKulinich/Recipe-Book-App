interface FormFieldProps {
    id: string;
    inputType: 'text' | 'email' | 'password' | 'search';
    inputPlaceholder: string;
    labelText: string;
    inputValue: string;
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
}


export const FormField:React.FC<FormFieldProps> = (
    {id, inputPlaceholder, inputType, labelText, inputValue, onChangeHandler}) => {
        
    return (
        <div className="formField">
            <label 
                htmlFor={id} 
            >
                {labelText}
            </label>
            <input 
                type={inputType} 
                name={id} 
                id={id} 
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={onChangeHandler}
            />
        </div>
    )
}