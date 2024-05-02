const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};

const firebaseapp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseapp);

const uploadImages = async (
  imageBuffer,
  directoryPath
) => {
  const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

  const storageRef = ref(storage, `${directoryPath}/${imageName}`);
  const metadata = { contentType: "image/jpeg" };
  const snapshot = await uploadBytesResumable(
    storageRef,
    imageBuffer,
    metadata
  );

  const uploadedImageUrl = await getDownloadURL(storageRef);
  return uploadedImageUrl;
};

module.exports = {
  uploadImages
};