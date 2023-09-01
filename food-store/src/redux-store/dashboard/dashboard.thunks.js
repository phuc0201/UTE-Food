import Cookies from 'js-cookie';
import { endpoint } from '../../utils/data';
import { setData, setLoading, setError } from './dashboard.slice';

export const fetchDashboard = ()=> async (dispatch) =>{
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/admin/dashboard`,{
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
            dispatch(setData(data))
        })
    } catch (error) {
        setError(error)
    } finally{
        dispatch(setLoading(false));
    }
}