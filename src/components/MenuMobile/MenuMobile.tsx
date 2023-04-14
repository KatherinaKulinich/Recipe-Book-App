import { useContext } from "react"
import { IconContext } from "react-icons"
import { GrClose } from "react-icons/Gr"
import { Auth } from "../Auth/Auth"
import { Logo } from "../Logo/Logo"
import { NavList } from "../NavList/NavList"
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch"
import { ThemeContext } from "../../ThemeProvider"


interface MenuMobileProps {
    onCloseMenu: () => void;
}

export const MenuMobile:React.FC<MenuMobileProps> = ({onCloseMenu}) => {

    const { theme } = useContext(ThemeContext);

    
    return (
        <div className="menuMobile">
            <div className={`menuMobile__popup ${
                theme === 'dark' ? 'menuMobile__popup--dark' : 'menuMobile__popup--light'
            }`}>
                <div className="menuMobile__content">
                    <div className="menuMobile__logoSection">
                        <Logo/>
                        <button 
                            className='menuMobile__closeButton'
                            type="button"
                            onClick={onCloseMenu}
                        >
                            <IconContext.Provider value={{ size: "26" }}>
                                <GrClose/>
                            </IconContext.Provider>
                        </button>
                    </div>
                    <Auth/>
                    <NavList 
                        listClass={"menuMobile__navigation"} 
                        onCloseMobileMenu={onCloseMenu}
                    />
                    <ThemeSwitch/>
                </div>
            </div>
        </div>
    )
}