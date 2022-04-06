// Navigate: enviar usuário para determinar página
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

const PrivateRoute = ( { children, isPrivate } ) => {

    const { signed, loading } = useContext(AuthContext)

    // Se está logando, aparece uma mensagem informando que ta logando
    if (loading) {
        return(
            <div>Carregando</div>
        )
    }

    // se não está logado, redireciona pra página de login
    if(!signed && isPrivate) {
        return <Navigate to="/" />
    }

    // se está logado
    if (signed && !isPrivate) {
        return <Navigate to="/dashboard" />
    }

    return children;
}

export default PrivateRoute;