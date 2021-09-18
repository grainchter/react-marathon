import style from './Navbar.module.css';
import cn from 'classnames';
import { useState } from 'react/cjs/react.development';

const Navbar = ({ bgActive = false, onChangeActive, noneActive }) => {



    const [menuActive, setMenuStatus] = useState(false);


    const isNoneActive = () => {

        setMenuStatus(!menuActive);
        onChangeActive && onChangeActive(menuActive);
    }

    return (
        <nav className={cn(style.root, {
            [style.bgActive]: bgActive
        })}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <a className={cn(style.menuButton, {
                    [style.active]: menuActive
                })} onClick={isNoneActive}>
                    <span />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;