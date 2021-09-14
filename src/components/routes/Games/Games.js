import style from './Games.module.css';

const GamePage = ({ onChangePage }) => {

    const onGamesClick = () => {
        console.log('<Games />');
        onChangePage('app');
    }

    return (
        <div className = {style.center}>
            <h1>зис из гейм пэйдж</h1>
            <button onClick={onGamesClick}>
                Go to Home Page
            </button>
        </div>



    );
}

export default GamePage;