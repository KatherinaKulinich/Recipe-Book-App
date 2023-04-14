
import { Logo } from '../../Logo/Logo'
import { GiHamburgerMenu } from 'react-icons/Gi'
import { IconContext } from 'react-icons'
import { ThemeSwitch } from '../../ThemeSwitch/ThemeSwitch'
import { Auth } from '../../Auth/Auth'
import { useCallback, useState } from 'react'
import { MenuMobile } from '../../MenuMobile/MenuMobile'


export const MainHeader: React.FC = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    

    const toggleMobileMenu = useCallback(() => {
        setMobileMenu(!mobileMenu)
    }, [mobileMenu])

    return (
        <div className="header">
            <Logo/>
            <div className='header__content'>
                <div className="header__theme">
                    <ThemeSwitch/>
                </div>
                <div className="header__user">
                    <Auth/>
                </div>
                <button 
                    type="button" 
                    className='header__menuMobile'
                    onClick={toggleMobileMenu}
                >
                    <IconContext.Provider value={{ size: "30" }} >
                        <GiHamburgerMenu/>
                    </IconContext.Provider>
                </button>
            </div>
            {mobileMenu && (
                <MenuMobile 
                    onCloseMenu={toggleMobileMenu}
                />
            )}
        </div>
    )
}