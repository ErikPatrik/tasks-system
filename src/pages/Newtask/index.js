import { useState } from 'react'

import './newtask.css'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus } from 'react-icons/fi'

export default function Newtask() {
    const [subject, setSubject] = useState('Support')
    const [status, setStatus] = useState('Open')
    const [additional, setAdditional] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        alert('oi')
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
                        <select>
                            <option key={1} value={1}>
                                Erik
                            </option>
                        </select>

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