import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCe-Doqgd0OJ3sCSO6HoxzLr7jA9kZ3_4s",
  authDomain: "pokemon-game-62e1c.firebaseapp.com",
  databaseURL: "https://pokemon-game-62e1c-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-62e1c",
  storageBucket: "pokemon-game-62e1c.appspot.com",
  messagingSenderId: "302463404145",
  appId: "1:302463404145:web:f59a61f996f141d18bb3d0"
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;

export const database = fire.database();

export default database;