import PrivateRoute from './PrivateRoute';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import Newtask from '../pages/Newtask';

export default function RoutesApp() {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={
                    <PrivateRoute isPrivate={false}>
                        <SignIn/>
                    </PrivateRoute>
                } />

                <Route exact path="/register" element={
                    <PrivateRoute isPrivate={false}>
                        <SignUp/>
                    </PrivateRoute>
                } />

                <Route exact path="/dashboard" element={
                    <PrivateRoute isPrivate={true}>
                        <Dashboard/>
                    </PrivateRoute>
                } />

                <Route exact path="/profile" element={
                    <PrivateRoute isPrivate={true}>
                        <Profile/>
                    </PrivateRoute>
                } />

                <Route exact path="/customers" element={
                    <PrivateRoute isPrivate={true}>
                        <Customers/>
                    </PrivateRoute>
                } />

                <Route exact path="/newtask" element={
                    <PrivateRoute isPrivate={true}>
                        <Newtask/>
                    </PrivateRoute>
                } />

                <Route exact path="/newtask/:id" element={
                    <PrivateRoute isPrivate={true}>
                        <Newtask/>
                    </PrivateRoute>
                } />

            </Routes>
        </Router>
    )
}