import { useState, useEffect, createContext } from "react";
import { Routes } from "react-router-dom";
import App from "../App";
import firebase from "../services/FirebaseConnection";

export const AuthContext = createContext({

})

function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    // quando a aplicação é aberta e o contexto é montado la no App.js
    // o useEffect é chamado, onde é verificado se o usuário é logado, e se tiver colocamos dentro do useStateUser
    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('UserSystem')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
        }
            setLoading(false)
        }

        loadStorage()

    }, [])

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

// Fluxo realizado
// ContextApi: gerenciador de estado global, utilizado para passar dados de cima para baixo (do pai para o filho)
// é uma ideia do Redux basicamente
// No principal componente App, tood mundo que ta dentro do AuthProvider, que são as rotas/paginas
// ou seja, todos tem acessos aos dados passados

// Ou seja

// ContextAuth
//  - Routes(rotas)
// -- Pages

// Dizemos que se o user é nulo, o signed é falso, caso contrário se ti ver um objeto, o signed é true e consigo
// acessar o sistema

// Quando deslogar, o user volta a ser nulo