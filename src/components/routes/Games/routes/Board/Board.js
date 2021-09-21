import { PokemonContext } from '../../../../../context/PokemonContext';
import { useContext } from 'react';
import style from './Board.module.css';
import PokemonCard from '../../../../PokemonCard/PokemonCard';

const BoardPage = () => {

    const { pokemons } = useContext(PokemonContext);

    return (
        <div className={style.root}>
            <div className={style.playerOne}>
                {
                    Object.values(pokemons).map(({id, name, img, type, values}) => (
                        <PokemonCard
                            className={style.card}
                            key={id}
                            name={name}
                            img={img}
                            id={id}
                            type={type}
                            values={values}
                            minimaze
                            isActive
                        />
                    ))
                }
            </div>
            <div className={style.board}>
                <div className={style.boardPlate}>1</div>
                <div className={style.boardPlate}>2</div>
                <div className={style.boardPlate}>3</div>
                <div className={style.boardPlate}>4</div>
                <div className={style.boardPlate}>5</div>
                <div className={style.boardPlate}>6</div>
                <div className={style.boardPlate}>7</div>
                <div className={style.boardPlate}>8</div>
                <div className={style.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;