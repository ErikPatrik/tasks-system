import { useContext } from 'react'
import './header.css'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'

import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

export default function Header() {
    const { user } = useContext(AuthContext)

    return(
        <div className="sidebar">
            <div >
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Picture avatar" />
            </div>

            <Link to="/dashboard">
            <FiHome color="#FFF" size={24}/>
                Tasks
            </Link>

            <Link to="/customers">
            <FiUser color="#FFF" size={24}/>
                Clients
            </Link>

            <Link to="/profile">
            <FiSettings color="#FFF" size={24}/>
                Settings
            </Link>
        </div>
    )
}