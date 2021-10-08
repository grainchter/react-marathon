import { NotificationManager } from 'react-notifications';

import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";
import { useState } from 'react/cjs/react.development';
import Modal from "../../Modal/Modal";
import LoginForm from "../../LoginForm/LoginForm";
import { useDispatch } from 'react-redux';
import { getUserUpdateAsync } from '../../../store/user';


const MenuHeader = ({ bgActive }) => {

    const [menuClicked, setMenuClicked] = useState(false);
    const [menuPageActive, setMenuPageActive] = useState(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dispatch = useDispatch();

    const onIsClicked = (isClicked) => {
        setMenuClicked(isClicked);
    }

    const handleChangeActive = (menuActive) => {
        setMenuPageActive(menuActive);
    }

    const handleClickLogin = () => {
        setIsOpenModal(prevState => !prevState);
    }

    const handleSubmitLogin = async ({ email, password, regOrLog }) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        }

        if (regOrLog === true) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCe-Doqgd0OJ3sCSO6HoxzLr7jA9kZ3_4s', requestOptions).then(res => res.json())
            console.log(response);
            if (response.hasOwnProperty('error')) {
                NotificationManager.error(response.error.message, "Wrong");
            } else {
                NotificationManager.success('Success');
                const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
                for (const item of pokemonsStart.data) {
                    await fetch(`https://pokemon-game-62e1c-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    });
                }
            }
        } else if (regOrLog === false) {
            const responseAuth = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCe-Doqgd0OJ3sCSO6HoxzLr7jA9kZ3_4s', requestOptions).then(res => res.json())
            if (responseAuth.hasOwnProperty('error')) {
                NotificationManager.error(responseAuth.error.message, "Wrong");
            } else {
                localStorage.setItem('idToken', responseAuth.idToken);
                setIsOpenModal(prevState => !prevState);
                NotificationManager.success('Success Auth');
                dispatch(getUserUpdateAsync());

            }
        }


    }


    return (
        <>
            <Menu
                isActive={menuPageActive}
                onChangeActive={handleChangeActive}
                onIsClicked={onIsClicked} />
            <Navbar
                bgActive={bgActive}
                onChangeActive={handleChangeActive}
                noneActive={menuClicked}
                onClickLogin={handleClickLogin}
            />
            <Modal
                isOpen={isOpenModal}
                title="Log in"
                onCloseModal={handleClickLogin}
            >
                <LoginForm
                    onSubmit={handleSubmitLogin}
                />
            </Modal>

        </>
    );
}

export default MenuHeader;
