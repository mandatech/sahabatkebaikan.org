import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAFAfPM0DKHLHyDgU34s1NRA0ArQzAd9pM',
  authDomain: 'sahabatkebaikan-dev.firebaseapp.com',
  databaseURL: 'https://sahabatkebaikan-dev-default-rtdb.firebaseio.com',
  projectId: 'sahabatkebaikan-dev',
  storageBucket: 'sahabatkebaikan-dev.appspot.com',
  messagingSenderId: '876316187446',
  appId: '1:876316187446:web:2b9a7f7495a6f10973b197',
  measurementId: 'G-VME1RWFFHX',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;
