import { useState  } from 'react';
import { Link } from 'react-router-dom'
import './signin.css'
import logo from '../../assets/logo.png'

function SignIn() {
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
                <h1>Sign In</h1>
                <input type="text" placeholder='email@email.com' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <input type="password" placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>

            <Link to="/register">Create new account</Link>
        </div>
    </div>
);
}

export default SignIn;
