import { message } from 'antd';
import { getAuth, signOut} from 'firebase/auth';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userIcon from '../../assets/svg/userIcon.svg'
import { useAppDispatch } from '../../hooks/hooks';
import { useAuth } from '../../hooks/useUserAuth';
import { removeUser } from '../../rdx/slices/userReducer';
import { ThemeContext } from '../../ThemeProvider';
import { Button } from '../buttons/Button/Button'





export const Auth:React.FC = ( ) => {

    const { theme } = useContext(ThemeContext);
    const {isAuth, email, avatar, fullName} = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();



    const onLogOut = useCallback(() => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                dispatch(removeUser());
            })
            .catch((error) => {
                message.error(error.message, 3)
            });

    }, [dispatch])



    const onClick = useCallback(() => {
        
        if (isAuth) {
            onLogOut()
            return
        }
        navigate('/login')

    }, [isAuth])

    
    return (
         <div className={`auth ${
            theme === 'dark' ? 'auth--dark' : 'auth--light'
        }`}>
            {isAuth && (
                <div className="auth__userInfo">
                    <img 
                        src={avatar ? avatar : userIcon} 
                        alt="userAvatar" 
                        className="auth__userAvatar"
                    />
                    <div>
                        { fullName && (
                                <p className='auth__text'>
                                    {fullName}
                                </p>
                            )
                        }
                        <p className='auth__text'>
                            {email}
                        </p>
                    </div>
                </div>
            )}
            <Button
                buttonText={isAuth ? 'log out' : 'log in'} 
                buttonType={'button'}
                onHandleClick={onClick}
            />
        </div>
    )
}