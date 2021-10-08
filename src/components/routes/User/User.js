import style from './User.module.css';
import { selectUser } from '../../../store/user';
import { useSelector } from 'react-redux';

const UserPage = () => {
    const state = useSelector(selectUser);
    console.log(state);

    return (

        <div>
            <h1>Welcome {state.email} </h1>

        </div>



    );
}

export default UserPage;