
import { useAppSelector } from "./hooks"


export const useAuth = () => {
    const {email, password, id, avatar, fullName} = useAppSelector(state => state.user);
    

    return {
        isAuth: !!id,
        id,
        email,
        password,
        avatar, 
        fullName
    }
}

