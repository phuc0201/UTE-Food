import Cookies from 'js-cookie';
import { endpoint } from '../../utils/data';
import { setUserProfile, updateProfile, setLoading, setError, setUsers } from './userAccount.slice';

export const fetchUsers =()=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/admin/users`,{
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
            dispatch(setUsers(data))
        })
    } catch (error) {
        setError(error)
    } finally{
        dispatch(setLoading(false));
    }
}
export const setProfile = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/profile`,{
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
            dispatch(setUserProfile(data))
        })
    } catch (error) {
        setError(error)
    } finally{
        dispatch(setLoading(false));
    }
};
export const update = (user) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/profile`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('authToken')
            },
            body: JSON.stringify({
                full_name: user.full_name,
                address: user.address,
                phone_number: user.phone_number,
                date_of_birth: user.date_of_birth
            }),
        })
        .then(response => {
            if(response.status === 200)
                return response.json()
            })
        .then((data) => {
            dispatch(updateProfile(user))
        })
    } catch (error) {
        setError(error)
    } finally{
        dispatch(setLoading(false));
    }
}
export const changePasswordAction = (password) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`${endpoint}/auth/changepassword`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('authToken')
            },
            body: JSON.stringify({
                oldPassword: password.oldPassword, 
                newPassword: password.newPassword
            }),
        })
        .then(response => {
            if(response.status === 200)
                return response.json()
            })
        .then((data) => {})
    } catch (error) {
        setError(error)
    } finally{
        dispatch(setLoading(false));
    }
}