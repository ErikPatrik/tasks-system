import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from '../../contexts/auth'
import firebase from '../../services/FirebaseConnection'

import { useNavigate, useParams  } from 'react-router-dom'

import './newtask.css'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function Newtask() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [customers, setCustomers] = useState([])
    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)

    const [subject, setSubject] = useState('Support')
    const [status, setStatus] = useState('Open')
    const [additional, setAdditional] = useState('')

    // verify if is edit
    const [idCustomer, setIdCustomer] = useState(false)

    const { user } = useContext(AuthContext)

    // when screen open, loading data about customers
    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
            .get()
            .then((res) => {
                let list = []

                res.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia,
                    })
                })

                if (list.length === 0) {
                    console.log('No data to show')
                    setLoadCustomers(false)
                    setCustomers([ {
                        id: 1,
                        nomeFantasia: ''
                    }])
                    return
                }

                setCustomers(list)
                setLoadCustomers(false)

                // check if is Edit
                if (id) {
                    loadId(list)
                }
            })
            .catch((err) => {
                console.log("Error", err)
                // if error, set Load to false and add a fake customer
                setLoadCustomers(false)
                setCustomers([ {
                    id: 1,
                    nomeFantasia: ''
                }])
            })
        }

        loadCustomers()
    }, [id])

    const loadId = async(list) => {
        // get in firebase the id
        await firebase.firestore().collection('tasks').doc(id)
        .get()
        .then((res) => {
            // find the task
            setSubject(res.data().assunto)
            setStatus(res.data().status)
            setAdditional(res.data().complemento)

            let index = list.findIndex(item => item.id === res.data().clienteId)
            setCustomerSelected(index)

            // say is edit situation
            setIdCustomer(true)
        })
        .catch((err) => {
            console.log(err)
            toast.error('Error, contact the support!')
            setIdCustomer(false)
        })
    }

    // when submit form, save a task
    const handleSubmit = async (e) => {
        e.preventDefault()

        // try edit a task
        if (idCustomer) {
            await firebase.firestore().collection('tasks')
            .doc(id)
            .update({
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: subject,
                status: status,
                complemento: additional,
                userId: user.uid
            })
            .then(() => {
                toast.success('Task updated!')
                setCustomerSelected(0) //return to first item
                setAdditional('')
                navigate('/dashboard')
            })
            .catch((err) => {
                toast.error('Error to update task!')
                console.log(err)
            })

            return
        }

        await firebase.firestore().collection('tasks')
        .add({ // generate a key to task
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: subject,
            status: status,
            complemento: additional,
            userId: user.uid
        })
        .then(() => {
            toast.success('Task save, thanks!')
            setAdditional('')
            setCustomerSelected(0) //return to first item
        })
        .catch((err) => {
            console.log(err)
            toast.error('Erro to save Task! Try again.')
        })
    }

    // when change the subject select
    const handleChangeSelectSubject = (e) => {
        // receive the value and send to useState
        setSubject(e.target.value)
    }

    // when change the status
    const handleOptionChange = (e) => {
        setStatus(e.target.value)
    }

    // when change the customer
    const handleChangeCustomers = (e) => {
        // e.target.value (customer index)
        // console.log('customer selected', customers[e.target.value])
        setCustomerSelected(e.target.value)
    }

    return(
        <div>
            <Header />

            <div className='content'>
                <Title name="New task">
                    <FiPlus size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSubmit}>
                        <label>Customers</label>
                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Loading..."/>
                            ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                            )
                        }

                        <label>Subject</label>
                        <select value={subject} onChange={handleChangeSelectSubject} >
                            <option value="Support">Support</option>
                            <option value="Technical Visit">Technical Visit</option>
                            <option value="Finance">Finance</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type='radio' name='radio' value='Open' onChange={handleOptionChange} checked={ status === 'Open' } />
                            <span>Open</span>
                            <input type='radio' name='radio' value='Progress' onChange={handleOptionChange} checked={ status === 'Progress' } />
                            <span>In Progress</span>
                            <input type='radio' name='radio' value='Finished' onChange={handleOptionChange} checked={ status === 'Finished' }/>
                            <span>Finished</span>
                        </div>

                        <label>Additional</label>
                        <textarea type='text' placeholder='Describe your technical difficulty' value={additional} onChange={(e) => setAdditional(e.target.value)}/>

                        <button type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}