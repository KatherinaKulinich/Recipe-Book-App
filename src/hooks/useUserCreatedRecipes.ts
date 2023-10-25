import { UploadFile, message, Form } from "antd";
import { addDoc, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect, useCallback } from "react";
import { db, storage } from "../firebase";
import { fetchUserRecipes } from "../rdx/slices/createdRecipesReducer";
import { RecipeComponentUser, RecipeInstruction, RecipeTag } from "../types";
import { getRandomId } from "../utils/randomValues";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useAuth } from "./useUserAuth";





export const useUserCreatedRecipes = () => {
   
    const [imageUpload, setImageUpload] = useState<File[]>();
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const dispatch = useAppDispatch();
    const { id : userId } = useAuth();
    const userRecipes = useAppSelector(state => state.created.createdRecipes);
    
    const date = Date.now()
    const randomId = getRandomId(6);

    const tags:RecipeTag[] = [];
    const ingredients:RecipeComponentUser[] = []; 
    const instructions:RecipeInstruction[] = [];



    useEffect(()=> {
        userId && dispatch(fetchUserRecipes(userId))
    }, [dispatch, userId])




    const transformValues = (values:any) => {

        values.tags.map((item:string) => {
            const tag = {
                name: item.toLowerCase().replaceAll(' ', '_'),
                id: randomId(),
                display_name: item,
            }
            tags.push(tag); 
        })

        for (let i = 0; i < values.steps.length; i++) {
            const step = {
                id: randomId(),
                display_text: values.steps[i],
                position: i + 1
            }
            instructions.push(step)
        }

        values.ingredients.map((item:string) => {
            const product:RecipeComponentUser = {
                components: {
                    id: randomId(),
                    raw_text: item,
                }
            }
            ingredients.push(product)
        })
    }



    const onChangeFiles = ({fileList: newFileList}:any) => {
        setImageUpload(newFileList)
        setFileList(newFileList);
    }



    const onUploadRecipe = async (values:any) => {

            transformValues(values)
            message.loading('Loading recipe...')

            let docId:string;
            let images:string[] = [];
            

            if (userId) {
                await addDoc(collection(db, 'users', userId, 'created'), {
                    name: values.recipeName,
                    created_at: date,
                    sections: ingredients,
                    tags: tags,
                    nutrition: {
                        calories: values?.recipeCalories,
                        fat: values?.recipeFat,
                        protein: values?.recipeProtein,
                        carbohydrates: values?.recipeCarbohydrates
                    },
                    instructions: instructions,
                    description: values.recipeDescription,
                    thumbnail_url: [],
                    category: values.recipeCategory,

                })
                .then((doc) => docId = doc.id)

                imageUpload?.map((file:any) => {
                    const metadata = {
                            contentType: file.type,
                        };

                    const imageRef = ref(storage, `usersImages/${userId}/${date}/${file.name}`); 

                    uploadBytes(imageRef, file.originFileObj, metadata)
                    .then(async()=> {
                        const downloadURL = await getDownloadURL(imageRef);
                        await images.push(downloadURL)
                        await updateDoc(doc(db, 'users', userId, 'created', docId), {
                            thumbnail_url: images,
                            });
                        await dispatch(fetchUserRecipes(userId))
                    })
                })
                    
            await message.success('Upload!')
        }
    }




    const onDeleteRecipe = async (recipeId: string) => {

        if (userId) {
            message.loading('Deleting recipe...',1)

            await deleteDoc(doc(db, 'users', userId, 'created', recipeId));
            await dispatch(fetchUserRecipes(userId))
            await message.success('Deleted!')
        }
    }






    return {
        userRecipes,
        onUploadRecipe,
        onDeleteRecipe,
        fileList,
        onChangeFiles,
        open,
        imageUpload
    }
}