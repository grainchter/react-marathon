import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";
import { useState } from 'react/cjs/react.development';


const MenuHeader = ({ bgActive }) => {

    const onIsClicked = (isClicked) => {
        setMenuClicked(isClicked);
    }

    const handleChangeActive = (menuActive) => {
        setMenuPageActive(menuActive);
    }

    const [menuClicked, setMenuClicked] = useState(false);

    const [menuPageActive, setMenuPageActive] = useState(undefined);

    return (
        <>
            <Menu isActive={menuPageActive} onChangeActive={handleChangeActive} onIsClicked={onIsClicked} />
            <Navbar bgActive={bgActive} onChangeActive={handleChangeActive} noneActive={menuClicked} />

        </>
    );
}

export default MenuHeader;