/* eslint-disable import/no-anonymous-default-export */
// Switch: um compoenente por página
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
//import Route from './Route'
import PrivateRoute from './PrivateRoute'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'

// Quando acessar a página principal, renderiza o componente da página de login

export default function RoutesApp() {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<SignIn />} />
                <Route exact path="/register" element={<SignUp />} />
                <Route exact path="/dashboard/*" element={<PrivateRoute component={Dashboard} isPrivate />} />
                <Route exact path="/profile" element={<PrivateRoute component={Profile} isPrivate />} />
            </Routes>
        </Router>
    )
}