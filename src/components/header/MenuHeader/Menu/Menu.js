import style from './Menu.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';

const MENU = [
    {
        title: 'HOME',
        to: '/',
    },
    {
        title: 'GAME',
        to: '/game',
    },
    {
        title: 'ABOUT',
        to: '/about',
    },
    {
        title: 'CONTACT',
        to: '/contact',
    }
];

const Menu = ({ isActive, onChangeActive, onIsClicked }) => {

    const isClicked = true;

    const onMenuClick = ({ isActive }) => {
        onChangeActive(!isActive);
        onIsClicked && onIsClicked(isClicked);

    }

    return (
        <div className={cn(style.menuContainer, {
            [style.active]: isActive---true,
            [style.deactive]: isActive---false
        })} >
            <div className={style.overlay} />
            <div className={style.menuItems} >
                <ul>
                    {
                        MENU.map(({ title, to }, index) => (
                            <li key={index} onClick={onMenuClick}>
                                <Link to={to}>
                                    {title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Menu;