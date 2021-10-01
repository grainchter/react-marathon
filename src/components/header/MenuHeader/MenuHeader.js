import { NotificationManager } from 'react-notifications';

import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";
import { useState } from 'react/cjs/react.development';
import Modal from "../../Modal/Modal";
import LoginForm from "../../LoginForm/LoginForm";


const MenuHeader = ({ bgActive }) => {

    const [menuClicked, setMenuClicked] = useState(false);
    const [menuPageActive, setMenuPageActive] = useState(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);

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
            }
        } else if (regOrLog === false) {
            const responseAuth = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCe-Doqgd0OJ3sCSO6HoxzLr7jA9kZ3_4s', requestOptions).then(res => res.json())
            if (responseAuth.hasOwnProperty('error')) {
                NotificationManager.error(responseAuth.error.message, "Wrong");
            } else {
                localStorage.setItem('idToken', responseAuth.idToken);
                setIsOpenModal(prevState => !prevState);
                NotificationManager.success('Success Auth');
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
