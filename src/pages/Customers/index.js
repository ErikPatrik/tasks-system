import { useState } from 'react'

import './customers.css'

import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiUser} from 'react-icons/fi'

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')


    const handleAdd = (e) => {
        e.preventDefault()
        alert('asdopjas')
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>
                        <label>Company Name</label>
                        <input type="text" placeholder='Company name' value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)}/>

                        <label>CNPJ</label>
                        <input type="text" placeholder='CNPJ' value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>

                        <label>Adress</label>
                        <input type="text" placeholder='Adress' value={endereco} onChange={(e) => setEndereco(e.target.value)}/>

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}