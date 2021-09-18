import database from './../../../service/firebase';
import { ref, update } from "firebase/database";

import { useHistory } from 'react-router';
import style from './Games.module.css';
import PokemonCard from '../../PokemonCard/PokemonCard';
import POKEMONS from './../../../json/pokemons.json';
import { useState, useEffect } from 'react';


const GamePage = () => {

    const history = useHistory();

    const onClick = () => {
        history.push('/');
    }

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        });
    }, []);

    const onPokemonClick = (isActive, id) => {

        let obj = Object.entries(pokemons);
        const key = obj.find(element =>
            element[1].id---id);
        const objID = key[0];
        update(ref(database, 'pokemons/' + objID), {
            active: isActive
        });

    }

    const onAddPokemon = () => {
        for (let i = 0; i < POKEMONS.length; i++) {
            const newKey = database.ref().child('pokemons').push().key;
            database.ref('pokemons/' + newKey).set(POKEMONS[i]);
        }

    }

    return (
        <div className={style.root}>
            <button onClick={onAddPokemon} >
                Add new pokemon
            </button>
            <div className={style.center}>

                {
                    Object.entries(pokemons).map(([key, { name, img, id, type, values, active }]) =>
                        <div className={style.card} >
                            <PokemonCard
                                key={id}
                                name={name}
                                img={img}
                                id={id}
                                type={type}
                                values={values}
                                isActive={active}
                                onPokemonClick={onPokemonClick}

                            />
                        </div>
                    )
                }
            </div>
            <button onClick={onClick} >
                Go to Home Page
            </button>

        </div>
    );
}

export default GamePage;