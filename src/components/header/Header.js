import style from './header.module.css';

const Header = ({ onClickButton }) => {

    const onClick = () => {
        onClickButton && onClickButton('game');
    }

    return (

        <header className={style.root}>
            <div className={style.forest}></div>
            <div className={style.container}>
                <h1>This is title</h1>
                <p>This is Description!</p>
                <button onClick={onClick}>
                    Start Game
                </button>
            </div>
        </header>

    );
}

export default Header;