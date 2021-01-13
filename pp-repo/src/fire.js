import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBaaUGTguniF9gKqyMdLl4eeB-M-DycxAE",
  authDomain: "new-test-5db57.firebaseapp.com",
  databaseURL: "https://new-test-5db57.firebaseio.com",
  projectId: "new-test-5db57",
  storageBucket: "new-test-5db57.appspot.com",
  messagingSenderId: "484796780860",
  appId: "1:484796780860:web:9ebc1c4780d9dc3a788e39",
  measurementId: "G-Q6DN357VPL",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;