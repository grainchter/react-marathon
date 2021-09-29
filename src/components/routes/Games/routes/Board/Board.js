import {  useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import style from './Board.module.css';
import PokemonCard from '../../../../PokemonCard/PokemonCard';
import PlayerBoard from './component/PlayerBoard/PlayerBoard';
import { useDispatch, useSelector } from 'react-redux';
import { getData, get2Data, getPokemons2Resolve } from './../../../../../store/pokemons1';


const counterWin = (board, player1, player2) => {



    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if (item.card.possession === 'blue') {
            player1Count++;
        }

        if (item.card.possession === 'red') {
            player2Count++;
        }
    });

    return [player1Count, player2Count];

}


const BoardPage = () => {

    const pokemons = useSelector(getData);
    const pokemons2 = useSelector(get2Data);
    const dispatch = useDispatch();

    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))
    });

    const [player2, setPlayer2] = useState([]);

    const history = useHistory();
    if (Object.keys(pokemons).length === 0) {
        history.replace('/game');
    }

    useEffect(async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);
        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const player2Request = await player2Response.json();
        dispatch(getPokemons2Resolve(player2Request));

        setPlayer2(() => {
            return player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            })
            )
        });

    }, []);

    const onClickBoardPlate = async (position) => {
        console.log(position);
        console.log(choiceCard);
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            };

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            setBoard(request.data);
            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            })
        }
    }

    useEffect(() => {
        if (steps === 9) {

            const [count1, count2] = counterWin(board, player1, player2);

            if (count1 > count2) {
                history.replace('/game/finish');
            } else if (count1 < count2) {
                history.replace('/game/finish');
            } else {
                history.replace('/game/finish');
            }
        }
    }, [steps])

    return (
        <div className={style.root}>

            <div className={style.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
            <div className={style.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={style.boardPlate}
                            onClick={() => !item.card && onClickBoardPlate(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimaze />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={style.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;