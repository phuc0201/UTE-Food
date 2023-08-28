import Cookies from 'js-cookie';
import { endpoint } from '../../utils/data';
import { addToCart, removeFromCart, setCartItems, setLoading } from './cart.slice';

export const fetchCartItems = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/cart`,{
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
            dispatch(setCartItems(data))
        })
    } catch (error) {
        console.error(error)
    } finally{
        dispatch(setLoading(false));
    }
};