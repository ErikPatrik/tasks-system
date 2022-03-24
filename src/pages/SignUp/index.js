import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { AuthContext }  from '../../contexts/auth'

function SignUp() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (nome !== '' && email !== '' && password !== '') {
            // se não for vazio, passa pra função os dados para cadastrar
            signUp(email, password, nome)
        }
    }

return (
    <div className="container-center">
        <div className='login'>
            <div className='login-area'>
                <img src={logo} alt="Logo System" />
            </div>

            <form onSubmit={handleSubmit}>
                <h1>Register a account</h1>
                <input type="text" placeholder='nome' value={nome} onChange={(event) => setNome(event.target.value)}></input>
                <input type="text" placeholder='email@email.com' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <input type="password" placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">{ loadingAuth ? 'Loading...' : 'Register' }</button>
            </form>

            <Link to="/">Have a account? Login  here</Link>
        </div>
    </div>
);
}

export default SignUp;
