import PokemonCard from '../../../../../../PokemonCard/PokemonCard';
import style from './PlayerBoard.module.css';
import cn from 'classnames';
import { useState } from 'react';

const PlayerBoard = ({ player, cards, onClickCard }) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map((item) => (
                    <div className={cn(style.cardBoard, {
                        [style.selected]: isSelected === item.id
                    })}
                        onClick={() => {
                            setSelected(item.id);
                            onClickCard && onClickCard({
                                player,
                                ...item,
                            });
                        }}
                    >
                        <PokemonCard
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            minimaze
                            isActive
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;