import { useState  } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

function SignUp() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('CLICOU')
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
                <button type="submit">Submit</button>
            </form>

            <Link to="/">Have a account? Login  here</Link>
        </div>
    </div>
);
}

export default SignUp;
