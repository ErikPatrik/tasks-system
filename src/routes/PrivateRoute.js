// Navigate: enviar usuário para determinar página
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function PrivateRoute({
    //componente que vai renderizar
    component: Component,
    isPrivate, // aqui verificamos se a rota é privada ou não
    ...rest // e repassa todas as propriedades que o react dom tem
}){

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

    return(
        <Component {...rest} />
    )
}