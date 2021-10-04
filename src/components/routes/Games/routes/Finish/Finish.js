import style from './Finish.module.css';

import PokemonCard from '../../../../PokemonCard/PokemonCard';
import { useState } from 'react/cjs/react.development';
import FirebaseClass from "./../../../../../service/firebase";
import { useHistory } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { getData, get2Data, getPokemonsResolve, getPokemons2Resolve } from './../../../../../store/pokemons1';


const FinishPage = () => {

    const history = useHistory();
    const [addingPokemos, setAddingPokemon] = useState();

    const pokemons = useSelector(getData);
    const pokemons2 = useSelector(get2Data).data;
    const dispatch = useDispatch();


    const clicked = (id) => {
        console.log(id);
        let obj = Object.entries(pokemons2);
        const keyPock = obj.find(element =>
            element[1].id === id);
        setAddingPokemon(keyPock[1]);
        // dispatch(getPokemonsResolve({}));
    }

    const onAddPokemon = () => {
        if (addingPokemos != undefined) {
            console.log(addingPokemos);
            FirebaseClass.addNewPokemon(addingPokemos);
            // clean();
            history.replace('/');
        } else {
            alert('Нужно выбрать покемона');
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

                                clicked(id);

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