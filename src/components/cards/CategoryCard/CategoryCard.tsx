import { Link } from 'react-router-dom';


interface CategoryCardProps {
    name: string;
    description: string;
    imagePath: string;
    linkPath:string;
    onSaveCategoryName: () => void;
}



export const CategoryCard:React.FC<CategoryCardProps> = ({name, description, imagePath, linkPath, onSaveCategoryName}) => {
    return (
        <div className='categoryCard'>
            <div className='categoryCard__front'>
                <div className='categoryCard__imageBox'>
                    <img 
                        src={imagePath} 
                        alt="foodImage" 
                        width={'300px'} 
                        height={'200px'}
                    />
                </div>
                <h3 className='categoryCard__title'>
                    {name}
                </h3>
                <div className='categoryCard__content'>
                    <p className='categoryCard__description'>
                        {description}
                    </p>
                    <Link to={linkPath}>
                        <button 
                            type="button" 
                            className="categoryCard__button buttonDetails"
                            onClick={onSaveCategoryName}
                        >
                            <span 
                            className="buttonDetails__circle" 
                            aria-hidden="true"
                            >
                                <span className="buttonDetails__arrow-icon"></span>
                            </span>
                            <span className="buttonDetails__text">
                                See all recipes
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}