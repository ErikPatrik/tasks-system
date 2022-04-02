import { useState } from 'react'

import Header from '../../components/Header';
import Title from '../../components/Title'

import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'

function Dashboard() {
    const [tasks, setTasks] = useState([])

return (
    <div>
        <Header />

        <div className='content'>
            <Title name="Tasks">
                <FiMessageSquare size={25} />
            </Title>

            { tasks.length === 0 ? (
                <div className='container dashboard'>
                <span>
                    No tasks...
                </span>
                <Link to="/newtask" className='new-task'>
                    <FiPlus color='#fff' size={25}/>
                    New task
                </Link>
            </div>
            ) : (
                <>
                <Link to="/newtask" className='new-task'>
                    <FiPlus color='#fff' size={25}/>
                    New task
                </Link>

                <table>
                    <thead>
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created at</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Customer">Sujeito</td>
                            <td data-label="Subject">Suporte</td>
                            <td data-label="Status">
                                <span className='badge' style={{backgroundColor: '#5cb85c'}}>
                                    Open
                                </span>
                            </td>
                            <td data-label="Created">20/06/2021</td>
                            <td data-label="#">
                                <button className='action' style={{backgroundColor: '#3583f6'}}>
                                    <FiSearch color='#FFF' size={17} />
                                </button>
                                <button className='action' style={{backgroundColor: '#f6a935'}}>
                                    <FiEdit2 color='#FFF' size={17} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </>
            )}

        </div>
    </div>
);
}

export default Dashboard;
