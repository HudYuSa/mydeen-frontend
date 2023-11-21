// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp({
  // Your web app's Firebase configuration
  apiKey: "AIzaSyADVR9oPrUUl4UG-yj_5VrFHqHVcy8V4P8",
  authDomain: "urlsaver-f3a58.firebaseapp.com",
  projectId: "urlsaver-f3a58",
  storageBucket: "urlsaver-f3a58.appspot.com",
  messagingSenderId: "803329195446",
  appId: "1:803329195446:web:8a6323c5eb50e602e31517",
});

export const db = getFirestore(app);

export const fetchUrls = async () => {
  try {
    const urlsRef = collection(db, "urls");
    const snapshot = await getDocs(urlsRef);

    const url = snapshot.docs
      .find((doc) => doc.data().name == "social-media-comment")
      .data();
    console.log(url);
    return url.url;
  } catch (error) {
    console.error("Error fetching URLs:", error);
  }
};
