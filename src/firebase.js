import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCrdU61DkQY_zk3CqabWn6R-wGKWNrRN3Q",
    authDomain: "netflix-clone-70f59.firebaseapp.com",
    projectId: "netflix-clone-70f59",
    storageBucket: "netflix-clone-70f59.appspot.com",
    messagingSenderId: "445893796532",
    appId: "1:445893796532:web:aa6f0e44f7c5834dee2de1",
    measurementId: "G-K2KCWTRS4R"
  };

  //initialize firebase app with firebase config, pass config object store in firebase APP
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();  //access firestore db instance
const auth = firebase.auth();

export { auth };
export default db;
