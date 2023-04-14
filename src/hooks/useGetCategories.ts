import { getDocs, collection } from "firebase/firestore";
import { useState, useCallback, useEffect } from "react";
import { db } from "../firebase";

export const useGetCategories = () => {

    const [categories, setCategories] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');


    
    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "categories"));
            
            setCategories(querySnapshot.docs.map(doc => ({
                id:doc.id,...doc.data()
            })))
        }
        catch(error: any) {
            setError(error.message)
        }
        finally {
            setLoading(false)
        }

    }, []);


    useEffect(() => {
        fetchCategories()
    }, [])
    
    



    return {
        categories,
        loading,
        error
    }
}