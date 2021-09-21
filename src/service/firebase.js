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

class Firebase {
  constructor() {

    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    })
  }

  offPokemonSoket = () => {
    this.database.ref('pokemons').off();
  }

  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  }



  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (lengthArr, POKEMONS, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(POKEMONS[Math.floor(Math.random() * lengthArr)]).then(() => cb());
  }

}

export default Firebase;