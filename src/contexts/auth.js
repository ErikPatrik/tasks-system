import { useState, useEffect, createContext } from "react";
import firebase from "../services/FirebaseConnection";
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

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

    // Função para logar
    async function signIn(email, password) {
        setLoadingAuth(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async(res) => { // temos acesso ao ID e ao documento
            let uid = res.user.uid

            // buscar as informações do usuário de acordo com o ID
            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get() // acessamos o documento com este ID e buscamos

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: res.user.email
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Welcome again')
        })
        .catch((error) => {
            toast.error('Ooops... Something is wrong!')
        })
    }

    // Função pra cadastrar usuário
    async function signUp(email, password, nome) {
        // começou o loading alguém está cadastrado
        setLoadingAuth(true)
        // Tenta ser criado um usuário para autenticação no Firebase
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async(res) => {
            // Pega o ID gerado
            let uid = res.user.uid

            // Com o ID gerado, tenta cadastrar no banco de dados, na coleção Users,
            // Passando o ID pra tentar cadastrar um documento
            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,

            })
            .then(() => {
                // Se cadastrou no banco, disponibilizamos os dados no setUser pra todos terem acesso
                let data = {
                    uid: uid,
                    nome: nome,
                    email: res.user.email,
                    avatarUrl: null
                }

                // passando pro useState
                setUser(data)

                // passa pra a função pra salvar no localStorage
                storageUser(data)

                setLoadingAuth(false)

                //alerta de bem vindo usando toastfy
                toast.success('Welcome to dashboard')
            })
        }).catch((error) => {
            toast.error('Ooops... Something is wrong!')
            setLoadingAuth(false)
        })
    }

    // Salvamos os dados no storage
    function storageUser(data) {
        localStorage.setItem('UserSystem', JSON.stringify(data))
    }

    // Deslogar do sistema
    async function signOut() {
        await firebase.auth().signOut()
        localStorage.removeItem('UserSystem')
        setUser(null)
    }

    return(
        <AuthContext.Provider
        value={
                {
                    signed: !!user,
                    user,
                    loading,
                    signUp,
                    signOut,
                    signIn,
                    loadingAuth,
                    setUser,
                    storageUser
                }
            }>
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