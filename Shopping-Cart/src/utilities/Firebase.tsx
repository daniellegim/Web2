import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBChS6alm6n2hJOrXHnzZI08IOwoyO3ztc",
    authDomain: "react-final-project-d4a02.firebaseapp.com",
    projectId: "react-final-project-d4a02",
    storageBucket: "react-final-project-d4a02.appspot.com",
    messagingSenderId: "275469161068",
    appId: "1:275469161068:web:8ba6c96c4d72d03e3cfe49"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
