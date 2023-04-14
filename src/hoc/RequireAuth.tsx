import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useUserAuth";



interface RequireAuthChildrenProps {
    children: React.ReactElement
}


export const RequireAuth = ({children}:RequireAuthChildrenProps) => {
    const {isAuth} = useAuth();
    
    if (!isAuth) {
        return <Navigate to={'/login'} replace/>
    }

    return children;
}