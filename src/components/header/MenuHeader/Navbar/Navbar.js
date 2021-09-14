import style from './Navbar.module.css';
import cn from 'classnames';
import { useState } from 'react/cjs/react.development';

const Navbar = ({ onChangeActive }) => {

    const [menuActive, setMenuStatus] = useState(false);

    const onMenuClick = () => {
        setMenuStatus(!menuActive);
        onChangeActive && onChangeActive(menuActive);
    }

    return (
        <nav className={style.root}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <a className={cn(style.menuButton, { [style.active]: menuActive })} onClick={onMenuClick}>
                    <span />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;