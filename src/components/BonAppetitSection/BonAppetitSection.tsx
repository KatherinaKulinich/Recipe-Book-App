import img6 from '../../assets/images/final2.jpg';
import img7 from '../../assets/images/final3.jpg';
import img8 from '../../assets/images/final6.jpg';

export const BonAppetitSection:React.FC = ( ) => {
    return (
        <div className="bonAppetit">
            <h2 className="bonAppetit__title">
                Bon appétit!
            </h2>
            <div className="bonAppetit__imagesList">
                <div className="bonAppetit__imageBox">
                    <img 
                        src={img8} 
                        alt="image" 
                        className="bonAppetit__image"
                    /> 
                </div>
                <img 
                    src={img6} 
                    alt="image" 
                    className="bonAppetit__image"
                /> 
                <img 
                    src={img7} 
                    alt="image" 
                    className="bonAppetit__image"
                /> 
            </div>
        </div>
    )
}