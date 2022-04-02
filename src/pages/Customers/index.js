import { useState } from 'react'

import './customers.css'

import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiUser} from 'react-icons/fi'

import firebase from "../../services/FirebaseConnection";

import { toast } from 'react-toastify'

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')


    const handleAdd = async (e) => {
        e.preventDefault()
        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            }).then(() => {
                setNomeFantasia('')
                setCnpj('')
                setEndereco('')

                toast.success('Customer save successfully!')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Error to save customer!')
            })
        } else {
            toast.error('Check the fields to save the customer!')
        }
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