
import { BackButton } from "../../components/buttons/BackButton/BackButton"
import { ImageBackground } from "../../components/ImageBackground/ImageBackground"

export const Page404:React.FC = () => {

    return (
        <ImageBackground>
            <div className="errorPage">
                <div className="errorPage__information">
                    <h1 className="errorPage__title">
                        404
                    </h1>
                    <p className="errorPage__text">
                        Sorry, the page you visited does not exist.
                    </p>
                </div>
                <BackButton/>
            </div>
        </ImageBackground>
    )
}