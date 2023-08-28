import Cookies from 'js-cookie';
import { endpoint } from '../../utils/data';
import { setCategories, setError, setLoading } from './category.slice';
export const fetchCategories = ()=> async (dispatch)=>{
    try {
        dispatch(setLoading(true))
        await fetch(`${endpoint}/categories`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('authToken')
            }
        })
        .then(response => {
            if(response.status === 200)
                return response.json()
            })
        .then((data) => {
            dispatch(setCategories(data))
        })
    } catch (error) {
        dispatch(setError(error))
    } finally{
        dispatch(setLoading(false))
    }
}