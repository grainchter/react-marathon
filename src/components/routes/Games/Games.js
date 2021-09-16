import { useHistory } from 'react-router';
import style from './Games.module.css';
import PokemonCard from '../../PokemonCard/PokemonCard';
import POKEMONS from './../../../json/pokemons.json';
import { useState } from 'react';

const POKEMONDATA = POKEMONS.map(pokemon => {
    Object.assign(pokemon, { 'active': false })
    return pokemon;
})

const GamePage = () => {

    const history = useHistory();

    const onClick = () => {
        history.push('/');
    }

    const [pokemons, setPokemons] = useState(() => POKEMONS.slice(0, 5));

    const onClickPokemon = (id) => {
        setPokemons(prevState =>
            prevState.map(
                item => item.id === id ?
                    { ...item, active: !item.active } :
                    item
            )
        )
    }


    return (
        <div className={style.root}>
            <div className={style.center}>
                <h1>зис из гейм пэйдж</h1>


                {
                    pokemons.map((item) =>
                        <div className={style.card}>
                            <PokemonCard
                                key={item.id}
                                name={item.name}
                                img={item.img}
                                id={item.id}
                                type={item.type}
                                values={item.values}
                                isActive={item.active}
                                onClickPokemon={onClickPokemon}
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