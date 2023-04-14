import { useGoBack } from "../../../hooks/useGoBack"



export const BackButton:React.FC = () => {
    const {goBack} = useGoBack();

    
    return (
        <button 
            onClick={goBack}
            type='button'
            className='backButton'
        >
            Go back
        </button>
    )
}