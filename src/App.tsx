import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "./hoc/RequireAuth"
import { Layout } from "./layout/Layout"
import { Page404 } from "./pages/404Page/Page404"
import { CategoriesPage } from "./pages/CategoriesPage/CategoriesPage"
import { FavoritesRecipesPage } from "./pages/FavoritesRecipesPage/FavoritesRecipesPage"
import { HomePage } from "./pages/HomePage/HomePage"
import { LoginPage } from "./pages/LogInPage/LoginPage"
import { MyRecipesPage } from "./pages/MyRecipesPage/MyRecipesPage"
import { PopularRecipesPage } from "./pages/PopularRecipesPage/PopularRecipesPage"
import { RecipeDetailsPage } from "./pages/RecipeDetailsPage/RecipeDetailsPage"
import { RecipesListPage } from "./pages/RecipesListPage/RecipesListPage"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage"




export const App: React.FC = () => {

    return (
        <>
            <Routes>
                <Route 
                    path="/" 
                    element={<Layout/>}
                >
                    <Route index element={<HomePage/>} />
                    <Route path="categories" element={<CategoriesPage/>} />
                    <Route path="categories/:categoryName"  element={<RecipesListPage/>} />
                    <Route path="categories/:categoryName/:recipeName"  element={<RecipeDetailsPage/>} />
                    <Route path="popular"  element={<PopularRecipesPage/>} />
                    <Route path="popular/:recipeName" element={<RecipeDetailsPage/>} />
                    <Route path="favorites" element={
                            <RequireAuth>
                                <FavoritesRecipesPage/>
                            </RequireAuth>
                        } 
                    />
                    <Route path="favorites/:recipeName" element={<RecipeDetailsPage/>} />
                    <Route path="myrecipes" element={
                            <RequireAuth>
                                <MyRecipesPage/>
                            </RequireAuth>
                        }
                    />
                    <Route path="myrecipes/:recipeName" element={<RecipeDetailsPage/>}/>
                    <Route path="recipeslist" element={<RecipesListPage/>} />
                    <Route path="recipeslist/:recipeName" element={<RecipeDetailsPage/>} />
                    <Route path="recipeslistbytag/:tag"  element={<RecipesListPage/>}/>
                    <Route path="recipeslistbytag/:tag/:recipeName"  element={<RecipeDetailsPage/>}/>
                </Route>
                <Route path="login" element={<LoginPage/>} />
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="*" element={<Page404/>} />
            </Routes>
        </>
    )
}