import { useState, useEffect } from 'react'

import Header from '../../components/Header';
import Title from '../../components/Title'

import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import firebase from '../../services/FirebaseConnection'
import { toast } from 'react-toastify';

import { format, setDate } from 'date-fns';

import Modal from '../../components/Modal'

const listRef = firebase.firestore().collection('tasks').orderBy('created', 'desc')

function Dashboard() {
    const [tasks, setTasks] = useState([])
    // control searching data
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()

    //save item click
    const [showPostModal, setShowPostModal] = useState(false)
    //data detail
    const [detail, setDetail] = useState()

    useEffect(() => {

        // get the tasks
        const loadTasks = async() => {
            await listRef.limit(5)
            .get()
            .then((res) => {
                updateState(res)
            })
            .catch((err) => {
                console.log(err)
                toast.error('Error to get tasks!')
                setLoadingMore(false)
            })

        setLoading(false)
    }

        loadTasks()

        // when the component is desmonted
        return () => {

        }
    },[])

    const updateState = async (res) => {
        // if no tasks (empty)
        const isCollectionEmpty = res.size === 0
        if (!isCollectionEmpty) {
            // foreach in list
            let list = []
            res.forEach((doc) => {
                list.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created, // date-fns install in reac
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            // register/get the last item in constant, because the pagination
            const lastDoc = res.docs[res.docs.length -1]

            setTasks(tasks => [...tasks, ...list])
            setLastDocs(lastDoc)
        } else {
            setIsEmpty(true)
        }

        setLoadingMore(false)
    }

    const handleMore = async () => {
        setLoadingMore(true)
        // begin after the last Doc
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((res) => {
            updateState(res)
        })
    }

    const togglePostModal = (item) => {
        setShowPostModal(!showPostModal) // change value with value base // true === false, false === true
        setDetail(item)
    }

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            setShowPostModal(false)
        }
    };

    // condition render
    if (loading) {
        return(
            <div>
                <Header />

                <div className='content'>
                    <Title name="Tasks">
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className='container dashboard'>
                        <span>Searching tasks...</span>
                    </div>
                </div>
            </div>
        )
    }

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
                        {tasks.map((item, index) => {
                            return(
                                <tr key={index}>
                                <td data-label="Customer">{item.cliente}</td>
                                <td data-label="Subject">{item.assunto}</td>
                                <td data-label="Status">
                                    <span className='badge' style={{backgroundColor: item.status === 'Open' ? '#5cb85c' : '#999'}}>
                                        {item.status}
                                    </span>
                                </td>
                                <td data-label="Created">{item.createdFormated}</td>
                                <td data-label="#">
                                    <button className='action' style={{backgroundColor: '#3583f6'}} onClick={() => togglePostModal(item)}>
                                        <FiSearch color='#FFF' size={17} />
                                    </button>
                                    <Link className='action' style={{backgroundColor: '#f6a935'}} to={`/newtask/${item.id}`}>
                                        <FiEdit2 color='#FFF' size={17} />
                                    </Link>
                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15  }} >Searching tasks...</h3>}
                { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Load more tasks</button>}
                </>
            )}
        </div>

        {showPostModal && (
            <Modal content={detail} close={togglePostModal} />
        )}

    </div>
);
}

export default Dashboard;
