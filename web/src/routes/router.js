import { Navigate } from "react-router-dom";

export const AdminRoutes = ({component}) => {
    let token = JSON.parse(localStorage.getItem('admin_token'));
    return token ? ((token.token =='admin') ? component : <Navigate to="/admin"></Navigate>) : <Navigate to="/admin/login" />
}

export const PrivateRoute = ({component}) => {
    let token = JSON.parse(localStorage.getItem('token'));
    // console.log("Token: ", token);
    return token ? ((token.token != "admin") ? component : <Navigate to="/admin" />) : <Navigate to="/login"></Navigate>;

}