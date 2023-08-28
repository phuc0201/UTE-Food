import Cookies from 'js-cookie';
import { endpoint } from '../../utils/data';
import { setOrderItems, createOrder, setLoading, setError, setOrders } from './order.slice';

export const fetchOrders = ()=> async (dispatch) =>{
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/order`,{
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
            dispatch(setOrders(data))
        })
    } catch (error) {
        setError(error)
    } finally{
        dispatch(setLoading(false));
    }
}
export const create_order = (order) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/order`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('authToken')
            },
            body: JSON.stringify({
                full_name: order.full_name,
                address: order.address,
                phone_number: order.phone_number
            }),
        })
        .then(response => {
            if(response.status === 200)
                return response.json()
            })
        .then((data) => {
            dispatch(createOrder(data))
        })
    } catch (error) {
        setError(error)
    } finally{
        dispatch(setLoading(false));
    }
};
export const getUserOrder = () => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/order`,{
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
            dispatch(setOrderItems(data))
        })
    } catch (error) {
        setError(error)
    } finally {
        dispatch(setLoading(false));
    }
}