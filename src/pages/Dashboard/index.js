import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'

function Dashboard() {

return (
    <div>
        <Header />
        <h1>
            Dashboard
        </h1>
    </div>
);
}

export default Dashboard;
