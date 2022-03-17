import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDE9oK9J0z2uQ_O60y9szZ40KbZaXPizA8",
    authDomain: "sistema-chamados-48295.firebaseapp.com",
    projectId: "sistema-chamados-48295",
    storageBucket: "sistema-chamados-48295.appspot.com",
    messagingSenderId: "338292740233",
    appId: "1:338292740233:web:581d025732069cfcc2f658",
    measurementId: "G-B4Q8WCWM9B"
};

// Aqui verificamos se não exisitr a conexão, ele abre
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase