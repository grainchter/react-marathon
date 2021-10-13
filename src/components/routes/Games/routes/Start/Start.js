import { useHistory } from 'react-router';
import style from './Start.module.css';
import PokemonCard from './../../../../PokemonCard/PokemonCard';

import { useState, useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync, selectPokemonsData } from '../../../../../store/pokemon';
import { getPokemonsResolve } from '../../../../../store/pokemons1';
// import { setPlayer1, setPlayer2, selectPlayer1, setResult} from '../../../../../store/game';



const StartPage = () => {

    const history = useHistory();

    const pokemonsRedux = useSelector(selectPokemonsData);

    const dispatch = useDispatch();

    const [pokemons, setPokemons] = useState({});




    useEffect(() => {
        dispatch(getPokemonsAsync());
        // dispatch(setPlayer1({}));
        // dispatch(setPlayer2([]));
        // dispatch(setResult(null));

    }, []);

    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);

    const onPokemonSelected = (key) => {

        setPokemons(prevState => {
            const getPokemons = {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected
                }
            };

            const selectedPokemons = Object.values(getPokemons).filter(item => item.selected === true);
            dispatch(getPokemonsResolve(selectedPokemons));
            return getPokemons;

        })

    };

    const onStartClick = () => {
        history.push('/game/board');
    }


    return (
        <>
            <div >
                <button className={style.buttonWrap} onClick={onStartClick} disabled={Object.values(pokemons).filter(item => item.selected === true).length < 4} >
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
                                if (Object.values(pokemons).filter(item => item.selected === true).length < 5 || selected) {
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