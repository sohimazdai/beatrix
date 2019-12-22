import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyDORzspI58znsP7khHHCgSecsUgZrGuolY",
  authDomain: "beatrix-f19b8.firebaseapp.com",
  databaseURL: "https://beatrix-f19b8.firebaseio.com",
  projectId: "beatrix-f19b8",
  storageBucket: "beatrix-f19b8.appspot.com",
  messagingSenderId: "361031893824",
  appId: "1:361031893824:web:cba11f07e59cd74b0ef0a5",
  measurementId: "G-Q01QZ5NJ9X"
};

const firebaseApp: Firebase.app.App = Firebase.initializeApp(config);
firebaseApp.auth().useDeviceLanguage();

const firebaseDb = firebaseApp.database();

const firebaseProvider = new Firebase.auth.GoogleAuthProvider();
firebaseProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export {
  firebaseApp,
  firebaseDb,
  firebaseProvider
}

