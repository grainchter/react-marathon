import { useState } from 'react';

import style from './PokemonCard.module.css';
import CardBackSide from './img/card-back-side.jpg';
import cn from 'classnames';

const PokemonCard = ({ className, name, img, id, type, values, isActive, isSelected, onPokemonClick, minimize }) => {

    // const [isActive, setActive] = useState(active);

    const onClick = () => {
        onPokemonClick && onPokemonClick(isActive, id);
        // setActive(!isActive);

    }


    return (
        <div className={cn(className, style.pokemonCard, {
            [style.active]: isActive,
            [style.selected]: isSelected,
         
        })}
          onClick = {onClick}>
            <div className={style.cardFront}>
                <div className={cn(style.wrap, style.front)}>
                    <div className={cn(style.pokemon, style[type])}>
                        <div className={style.values}>
                            <div className={cn(style.count, style.top)}>{values.top}</div>
                            <div className={cn(style.count, style.right)}>{values.right}</div>
                            <div className={cn(style.count, style.bottom)}>{values.bottom}</div>
                            <div className={cn(style.count, style.left)}>{values.left}</div>
                        </div>
                        <div className={style.imgContainer}>
                            <img src={img} alt={name} />
                        </div>
                        {!minimize && (<div className={style.info}>
                            <span className={style.number}>#{id}</span>
                            <h3 className={style.name}>
                                {name}
                            </h3>
                            <small className={style.type}>
                                Type: <span>{type}</span>
                            </small>
                        </div>)}
                    </div>
                </div>
            </div>

            <div className={style.cardBack}>
                <div className={cn(style.wrap, style.back)} />
            </div>

        </div>
    );
}

export default PokemonCard;