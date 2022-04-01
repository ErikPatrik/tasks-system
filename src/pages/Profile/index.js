import { useState, useContext } from 'react'

import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'

import { AuthContext } from '../../contexts/auth'

import { FiSettings, FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

import firebase from "../../services/FirebaseConnection";

export default function Profile() {
    // busca as informações do contexto
    const { user, signOut, setUser, storageUser } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    async function handleSave(e) {
        e.preventDefault()

        // change name only
        if (imageAvatar === null && nome !== '') {
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: nome
                }

                setUser(data)
                storageUser(data)
            }).catch((err) => {
                console.log(err)
            })
        // change only imagem
        } else if (nome !== '' && imageAvatar !== null) {
            handleUploadImg()
        }
    }

    function handleFile(e) {
        //console.log(e.target.files[0])

        //se selecinou alguma imagem
        if (e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                // cria uma url com a imagem que foi enviada
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                alert('Send image type JPEG or PNG')
                setImageAvatar(null)
                return null
            }
        }
    }

    //altera a imagem
    async function handleUploadImg() {
        //current user
        const currentUid = user.uid;

        const uploadImg = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async() => {

            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL() //url da imagem
            .then(async(url) => { // recebo a URL da foto
                let urlPhoto = url

                //send to firebase
                await firebase.firestore().collection('users')
                .doc(currentUid)
                .update({
                    avatarUrl: urlPhoto,
                    nome: nome
                })
                .then(() => {
                    // reflete no context global
                    let data = {
                        ...user,
                        avatarUrl: urlPhoto,
                        nome: nome
                    }

                    setUser(data)
                    storageUser(data)
                    })
                .catch((err) => {
                    console.log('aqui', err)
                })
            })
            .catch((err) => {
                console.log(err)
            })

            toast.success('Image upload: OK!')
        })
        .catch((err) => {
            console.log(err)
            toast.error('Error to upload imagem =(')
        })
    }

    return(
        <div>
            <Header />
            <div className='content'>
                <Title name="My perfil">
                    <FiSettings size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>

                            <input type="file" accept="image/" onChange={handleFile} /><br/>
                            {
                                avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="Profile image"/>
                                :
                                <img src={avatarUrl} width="250" height="250" alt="Profile imagem"/>
                            }
                        </label>

                        <label>Name</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>E-mail</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Save</button>

                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => signOut()}>Logout</button>
                </div>
            </div>
        </div>
    )
}