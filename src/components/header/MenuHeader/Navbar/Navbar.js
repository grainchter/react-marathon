import style from './Navbar.module.css';
import cn from 'classnames';
import { ReactComponent as LogoSVG } from './img/login.svg';

import { useState } from 'react/cjs/react.development';

const Navbar = ({ bgActive = false, onChangeActive, onClickLogin }) => {



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
                <div className={style.brand}>
                    LOGO
                </div>
                <div className={style.loginAndMenu}>
                    <div
                    className={style.loginWrap}
                    onClick={onClickLogin}
                    >
                        <LogoSVG />
                    </div>

                    <div className={cn(style.menuButton, {
                        [style.active]: menuActive
                    })} onClick={isNoneActive}>
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;