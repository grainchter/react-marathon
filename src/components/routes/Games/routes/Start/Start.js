import database from './../../../../../service/firebase';
import { ref, update } from "firebase/database";

import { useHistory } from 'react-router';
import style from './Start.module.css';
import PokemonCard from './../../../../PokemonCard/PokemonCard';
import POKEMONS from './../../../../../json/pokemons.json';
import { useState, useEffect } from 'react';

import { FireBaseContext } from '../../../../../context/FireBaseContext';
import { useContext } from 'react';
import { PokemonContext } from '../../../../../context/PokemonContext';


const StartPage = () => {

    const history = useHistory();
    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(PokemonContext);

    const [pokemons, setPokemons] = useState({});



    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemons(pokemons);
        });

        return () => firebase.offPokemonSoket();

    }, []);

    const onPokemonSelected = (key) => {
        const pokemon = { ...pokemons[key] };
        pokemonsContext.onSelectedPokemons(key, pokemon);
        setPokemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
    };

    const onStartClick = () => {
        history.push('/game/board');
    }


    return (
        <>
            <div >
                <button className={style.buttonWrap} onClick={onStartClick} disabled={Object.keys(pokemonsContext.pokemons).length < 5}>
                    Start game
                </button>
            </div>
            <div className={style.flex}>
                {
                    Object.entries(pokemons).map(([key, { name, img, id, type, values, selected }]) =>
                        <PokemonCard
                            className={style.card}
                            key={id}
                            name={name}
                            img={img}
                            id={id}
                            type={type}
                            values={values}
                            isActive={true}
                            isSelected={selected}
                            onPokemonClick={() => {
                                if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
                                    onPokemonSelected(key);
                                }
                            }
                            }

                        />
                    )
                }
            </div>





        </>
    );

}


export default StartPage;