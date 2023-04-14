import React from "react";
import { ThemeContext } from "../../ThemeProvider";




export const ThemeSwitch:React.FC = () => {
    const {theme, toggleTheme } = React.useContext(ThemeContext);


    return (
        <div className={`theme ${
            theme === 'dark' ? 'theme--dark' : 'theme--light'
        }`}>
            <p className='theme__text'>
                Theme
            </p>
            <label className="switch">
                <input 
                    type="checkbox"
                    onChange={toggleTheme}
                    value={theme}
                />
                <span className="switch__slider"></span>
                <span className="switch__text switch__text--light">
                    light
                </span>
                <span className="switch__text switch__text--dark">
                    dark
                </span>
            </label>
        </div>
    )
}