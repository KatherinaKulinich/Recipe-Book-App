
import React from "react"
import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer/Footer"
import { MainHeader } from "../components/Header/MainHeader/MainHeader"
import { Navigation } from "../components/Header/Navigation/Navigation"
import { ThemeContext } from "../ThemeProvider"


export const Layout:React.FC = () => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <div className={`body layout ${
            theme === 'dark' ? 'body--dark' : 'body--light'
        }`}>
            <header>
                <div className={`body__header ${
                    theme === 'dark' ? 'body__header--dark' : 'body__header--light'
                }`}>
                    <div className="wrapper">
                        <MainHeader/>
                    </div>
                </div>
                <div className="body__nav">
                    <div className="wrapper">
                        <Navigation/>
                    </div>
                </div>
            </header>
            <main className="body__main">
                <div className="wrapper">
                    <Outlet/>
                </div>
            </main>
            <footer className={`body__footer ${
                theme === 'dark' ? 'body__footer--dark' : 'body__footer--light'
            }`}>
                <div className="wrapper">
                    <Footer/>
                </div>
            </footer>
        </div>
    )
}