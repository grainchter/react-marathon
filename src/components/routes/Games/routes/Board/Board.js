import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import style from './Board.module.css';
import PokemonCard from '../../../../PokemonCard/PokemonCard';
import PlayerBoard from './component/PlayerBoard/PlayerBoard';
import { useDispatch, useSelector } from 'react-redux';
import { getData, get2Data, getPokemons2Resolve } from './../../../../../store/pokemons1';
import request from '../../../../../service/request';
import { returnBoard } from '../../../../../utils/utils';

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
    const dispatch = useDispatch();

    const [startSide, setStartSide] = useState(0);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);
    const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [typeResult, setTypeReasult] = useState(null);
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

        async function fetchData() {
            const boardRequest = await request.getBoard();
            setBoard(boardRequest.data);

            const player2Request = await request.gameStart({
                pokemons: Object.values(pokemons),
            });

            setTimeout(() => {
                const side = Math.floor(Math.random() * 2);
                setStartSide(side);
                console.log(startSide);
            }, 1000);

            dispatch(getPokemons2Resolve(player2Request.data));

            setPlayer2(() => {
                return player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                })
                )
            });
        }

        fetchData();

    }, []);

    const onClickBoardPlate = async (position) => {



        if (typeof choiceCard === 'object') {


            const params = {
                currentPlayer: '',
                hands: {
                    p1: player1,
                    p2: player2
                },
                move: {},
                board: serverBoard,
            };

            if (startSide === 0) {
                params.currentPlayer = 'p1';
                params.move = {
                    poke: {
                        ...choiceCard,
                    },
                    position,
                }
            } else {
                params.currentPlayer = 'p2';
                params.move = null;
            }

            console.log(params.currentPlayer);

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            setBoard(prevState => prevState.map(item => {
                if (item.position === position) {
                    return {
                        ...item,
                        card: choiceCard,
                    }
                }
                return item;

            }));

            const game = await request.game(params);

            setBoard(returnBoard(game.oldBoard));

            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            });

            if (game.move !== null) {
                const idAi = game.move.poke.id;

                setTimeout(() => {
                    setPlayer2(prevState => prevState.map(item => {
                        if (item.id === idAi) {
                            return {
                                ...item,
                                selected: true,
                            }
                        }
                        return item;
                    }));
                }, 1000);

                setTimeout(() => {
                    setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                    setServerBoard(game.board);
                    setBoard(returnBoard(game.board));

                    setSteps(prevState => {
                        const count = prevState + 1;
                        return count;
                    });

                }, 1500)

            }

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