import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAmX7UMzQjp3V-U7m_kCIKYpdAGjNdOk-k",
  authDomain: "chat-tutorial-891fb.firebaseapp.com",
  projectId: "chat-tutorial-891fb",
  storageBucket: "chat-tutorial-891fb.appspot.com",
  messagingSenderId: "665478563662",
  appId: "1:665478563662:web:f57c0ac6f078fef87f001f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
