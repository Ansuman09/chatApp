import { Route,Navigate,Routes } from "react-router-dom";
import Header from '../pages/header.js'

const PrivateRoute=({children,...rest})=>{
    console.log('Private route works')
    const authenticated=false
    return (
        <Routes>
        <Route {...rest}>
            {!authenticated ? <Navigate to='/login'/> : children}
        </Route>
        </Routes>
    )
}


export default PrivateRoute