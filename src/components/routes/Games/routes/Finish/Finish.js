import style from './Finish.module.css';
import cn from 'classnames';

import React, { useContext } from 'react';
import { PokemonContext } from '../../../../../context/PokemonContext';
import PokemonCard from '../../../../PokemonCard/PokemonCard';
import { useState } from 'react/cjs/react.development';
import { FireBaseContext } from '../../../../../context/FireBaseContext';
import { useHistory } from 'react-router';
import { cleanup } from '@testing-library/react';


const FinishPage = () => {

    const history = useHistory();
    const [addingPokemos, setAddingPokemon] = useState();
    const firebase = useContext(FireBaseContext);
    const { pokemons, pokemons2, clean } = useContext(PokemonContext);
    // console.log(pokemons2);

    const clicked = (id) => {
        // console.log(id);
        let obj = Object.entries(pokemons2);
        const keyPock = obj.find(element =>
            element[1].id === id);
        setAddingPokemon(keyPock[1]);
        // console.log(key[1]);
    }

    const onAddPokemon = () => {
        if (addingPokemos != undefined) {
            console.log(addingPokemos);
            firebase.addNewPokemon(addingPokemos);
            clean();
            history.replace('/');
        } else {
            alert('Нужно выбратьь покемона');
        }

    }

    return (
        <>
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
                        />
                    )
                }
            </div>

            <div >
                <h1>Выберите покемона соперника, чтобы закончить игру</h1>
                <button className={style.buttonWrap} onClick={onAddPokemon}>
                    Закончить игру
                </button>
            </div>

            <div className={style.flex}>
                {
                    Object.entries(pokemons2).map(([key, { name, img, id, type, values, selected }]) =>
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
                                // if (Object.keys(pokemons2).length < 5 || selected) {
                                //     console.log(pokemons2);
                                // }
                                clicked(id);
                                // console.log('click', key);
                            }
                            }

                        />
                    )
                }
            </div>






        </>


    );
}

export default FinishPage;