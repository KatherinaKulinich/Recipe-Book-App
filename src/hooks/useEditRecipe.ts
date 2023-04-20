import { message } from "antd";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { fetchUserRecipes } from "../rdx/slices/createdRecipesReducer";
import { Recipe, RecipeComponentUser } from "../types";
import { getRandomId } from "../utils/randomValues";
import { useAppDispatch } from "./hooks";
import { useAuth } from "./useUserAuth";

export const useEditRecipe = () => {

    const randomId = getRandomId(6);
    const dispatch = useAppDispatch();
    const { id : userId } = useAuth();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState<Recipe>({
        id: '',
        name: '',
        description: '',
        category: '',
        created_at: 0,
        thumbnail_url: '',
        nutrition: null,
        tags: [],
        sections: [],
        instructions: [],
        user_ratings: {
            count_positive: 0,
            count_negative: 0,
            score: 0,
        }
    })

    const showModal = () => {
        setIsModalOpen(true);
    };



    const onSaveRecipeChanges =  async(values:any) => {
        const {id} = recipeToEdit;

        let newSections: RecipeComponentUser[] = [];
        let newInstructions = [];

        for (let i = 0; i < values.recipeInstructions.length; i++) {
            const step = {
                id: randomId(),
                display_text: values.recipeInstructions[i],
                position: i + 1
            }
            newInstructions.push(step)
        }

        values.recipeIngredients.map((item:string) => {
            const product:RecipeComponentUser = {
                components: {
                    id: randomId(),
                    raw_text: item,
                }
            }
            newSections.push(product)
        })
       
        

        if (userId && id) {
            await updateDoc(doc(db, 'users', userId, 'created', id), {
                                    description: values.recipeDescription,
                                    sections: newSections,
                                    instructions: newInstructions,
                                })
            await message.loading('Loading edits...')
            await setIsModalOpen(false);
            await dispatch(fetchUserRecipes(userId))
            await message.success('Recipe has been changed!')
        }
    };



    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const onOpenModal =  (item: Recipe) => {
        setRecipeToEdit(item)
        showModal()
    }

    

    return {
        onCloseModal,
        onOpenModal,
        isModalOpen,
        onSaveRecipeChanges,
        recipeToEdit
    }
}