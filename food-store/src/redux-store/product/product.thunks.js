import Cookies from 'js-cookie';
import { endpoint } from '../../utils/data';
import { setProducts, setError, setLoading } from './product.slice';
export const fetchProducts = ()=> async (dispatch)=>{
    try {
        dispatch(setLoading(true))
        await fetch(`${endpoint}/product`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if(response.status === 200)
                return response.json()
            })
        .then((data) => {
            dispatch(setProducts(data))
        })
    } catch (error) {
        dispatch(setError(error))
    } finally{
        dispatch(setLoading(false))
    }
}