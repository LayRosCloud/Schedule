import {useState} from "react";

function useFetching(callback){
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const fetch = async() =>{
        setIsLoading(true)
        try{
            await callback()
            setIsLoading(false)
        }catch (e){
            setError(e)
        }
    }
    return [isLoading, fetch, error]
}
export default useFetching