import { Route, Routes } from "react-router-dom";
import AuthForm from "../pages/AuthForm";
import MainScreen from "../pages/MainScreen";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contacts";
import Items from '../admin/pages/Items'
import Bookings from "../admin/pages/Bookings";
import Users from '../admin/pages/Users'

import {AuthProvider} from '../components/AuthContext'
function AppRouter() {
    return (
        <AuthProvider>
        <Routes>
            <Route path="/" element={<AuthForm/>}  />
            <Route path="/hotels" element={<MainScreen/>}  />
            <Route path="/dashboard" element={<Dashboard/>}  />
            <Route path="/about" element={<About/>}  />
            <Route path="/contacts" element={<Contact/>}  />
            <Route path="/admin/items" element={<Items/>}  />
            <Route path="/admin/bookings" element={<Bookings/>}  />
            <Route path="/admin/users" element={<Users/>}  />
        </Routes>
        </AuthProvider>
    )
}

export default AppRouter