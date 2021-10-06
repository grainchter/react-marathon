import style from './Navbar.module.css';
import cn from 'classnames';
import { ReactComponent as LogoSVG } from './img/login.svg';
import { ReactComponent as UserSVG } from './img/user.svg';
import { ReactComponent as ExitSVG } from './img/exit.svg';
import { Link } from 'react-router-dom';


import { useState } from 'react/cjs/react.development';
import { useSelector } from 'react-redux';
import { selectLokalID, selectUserLoading } from '../../../../store/user';

const Navbar = ({ bgActive = false, onChangeActive, onClickLogin }) => {

    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLokalID);
    console.log(isLoadingUser);
    console.log(localId);

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
                    {(!isLoadingUser && !localId) && (
                        <div
                            className={style.loginWrap}
                            onClick={onClickLogin}
                        >
                            <LogoSVG />
                        </div>
                    )}

                    {(!isLoadingUser && localId) && (
                        <Link
                            className={style.loginWrap}
                            to='/user'
                        >
                            <UserSVG />
                        </Link>
                    )
                    }

                    {(!isLoadingUser && localId) && (
                        <div
                            className={style.exitWrap}
                            onClick={() => {
                                localStorage.removeItem("idToken");
                                window.location.reload();
                            }}
                        >
                            <ExitSVG />
                        </div>
                    )
                    }

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