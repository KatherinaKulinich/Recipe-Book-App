import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../ThemeProvider";


interface NavProps {
    listClass: string;
    onCloseMobileMenu?: () => void;
}




export const NavList:React.FC<NavProps> = ({listClass, onCloseMobileMenu}) => {
    const { theme } = useContext(ThemeContext);

    const setActive = ({isActive}:any):string => {
        return isActive ? 'nav__link nav__link--active' : 'nav__link';
    }


    return (
        <nav className={`nav  ${
            theme === 'dark' ? 'nav--dark' : 'nav--light'} ${listClass}
            `}
            onClick={onCloseMobileMenu}
        >
            <NavLink 
                to={"/"} 
                className={setActive}
            >
                Home
            </NavLink>
            <NavLink 
                to={"/categories"} 
                className={setActive}
            >
                Categories
            </NavLink>
            <NavLink 
                to={"/popular"} 
                className={setActive}
            >
                Popular
            </NavLink>
            <NavLink 
                to={"/favorites"} 
                className={setActive}
            >
                Favorites
            </NavLink>
            <NavLink 
                to={"/myrecipes"} 
                className={setActive}
            >
                My recipes
            </NavLink>
        </nav>
    )
}