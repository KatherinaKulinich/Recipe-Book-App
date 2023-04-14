import img1 from '../../assets/images/homePage1.jpg';
import img2 from '../../assets/images/homePage2.jpg';
import img3 from '../../assets/images/homePage3.jpg';
import img4 from '../../assets/images/homePage4.jpg';
import img5 from '../../assets/images/homePage5.jpg';
import img6 from '../../assets/images/homePage6.jpg';
import img7 from '../../assets/images/homePage7.jpg';
import img8 from '../../assets/images/homePage8.jpg';

import { BonAppetitSection } from "../../components/BonAppetitSection/BonAppetitSection";
import { HomeCard } from "../../components/cards/HomeCard/HomeCard";




export const HomePage:React.FC = () => {
    return (
        <>
            <div className="homepage">
                <h1 className="homepage__title">
                    Welcome to Recipe Book App!
                </h1>
                <div className="homepage__contentList">
                    <HomeCard 
                        image={img1} 
                        description={"Welcome to the ultimate recipe app that offers you a wide range of mouth-watering recipes from the best chefs around the world. Our easy-to-use interface allows you to search for recipes using keywords or browse by category, making it effortless to find the perfect recipe for any occasion. "}
                    />
                    <HomeCard 
                        image={img2} 
                        description={"With our rating system, you can quickly discover the most popular recipes among our users and cook a meal that is sure to impress. From delicious main courses to easy snacks, we have something for everyone. Choose and cook with pleasure!"} 
                        cardClass={'homecard--reverse'}
                    />
                    <HomeCard 
                        image={img4} 
                        description={"Whether you are looking for a recipe for a special occasion or just a quick weeknight meal, our app has got you covered."}
                    />
                    <HomeCard 
                        image={img3} 
                        description={"If you're an authorized user, you can save your favorite recipes to your personal recipe book and access them whenever you want. "} 
                        cardClass={'homecard--reverse'}
                    />
                    <HomeCard 
                        image={img7} 
                        description={"Moreover, you can even create your own recipes and save them to your account, so you never have to worry about losing your handwritten notes again."}
                    />
                    <HomeCard 
                        image={img6} 
                        description={"With our app, all your recipes from around the world will be in one place, making it a convenient and useful tool for all your cooking needs."}
                        cardClass={'homecard--reverse'}
                    />
                    <HomeCard 
                        image={img8} 
                        description={"Whether you're a novice cook or a seasoned pro, our Recipe App is the perfect tool for making delicious meals that everyone will love.  This app is easy to use."}
                    />
                    <HomeCard 
                        image={img5} 
                        description={"Start exploring our vast collection of recipes and find your next favorite dish today! Just search for a recipe, select the ingredients you have on hand, and start cooking!  Enjoy discovering new flavors and recipes today!"}
                        cardClass={'homecard--reverse'}
                    />
                </div>
            </div>
            <BonAppetitSection/>
        </>
    )
}