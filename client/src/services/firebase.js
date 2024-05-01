import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCr2sjssxJy3enrldpNFB-5E9GVnUbE3T0",
//   authDomain: "sharencare-3c4d1.firebaseapp.com",
//   projectId: "sharencare-3c4d1",
//   storageBucket: "sharencare-3c4d1.appspot.com",
//   messagingSenderId: "731929516926",
//   appId: "1:731929516926:web:3ca89fb7686e95259f712f",
//   measurementId: "G-JFM3XNZZVT"
// };

const firebaseapp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseapp);

export { storage };