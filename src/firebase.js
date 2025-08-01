import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADzhUnUS--GCE3aoC-96Zcxnk66WVCvbM",
  authDomain: "netflix-clone-de34b.firebaseapp.com",
  projectId: "netflix-clone-de34b",
  storageBucket: "netflix-clone-de34b.appspot.com",
  messagingSenderId: "535907849006",
  appId: "1:535907849006:web:fce2bb03c1580fca8ca0bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { 
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged
};