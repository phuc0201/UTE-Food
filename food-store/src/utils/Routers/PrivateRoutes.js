import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
const PrivateRoutes = ()=>{
    return(
        Cookies.get("authToken") ? <Outlet/> : <Navigate to={'/auth'}/>
    )
}
export default PrivateRoutes