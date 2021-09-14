import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";
import { useState } from 'react/cjs/react.development';


const MenuHeader = () => {

    const handleChangeActive = (menuActive) => {
        setMenuPageActive(menuActive);
    }

    const [menuPageActive, setMenuPageActive] = useState(undefined);

    return (
        <>
            <Navbar onChangeActive={handleChangeActive} />
            <Menu isActive={menuPageActive} />
        </>
    );
}

export default MenuHeader;