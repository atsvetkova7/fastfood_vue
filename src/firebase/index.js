import firebase from 'firebase'

export const config = {
    apiKey: "AIzaSyDBTaSLlMvxFh71z-nkxxekBA4SaV8sVLY",
    authDomain: "fastfoodauth.firebaseapp.com",
    databaseURL: "https://fastfoodauth.firebaseio.com",
    projectId: "fastfoodauth",
    storageBucket: "fastfoodauth.appspot.com",
    messagingSenderId: "695448138967"

}

firebase.initializeApp(config)

var dbRef = firebase.database().ref('fastfood');
var dbAuth = firebase.auth();
var dbStorage = firebase.storage();
export default firebase
export {dbRef}
export {dbAuth}
export {dbStorage}