import { useState } from 'react';
import style from './login.module.css';

const LoginForm = ({ onSubmit }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [signVal, setSignVal] = useState('Sign In');
    const [regOrLog, setRegOrLog] = useState(false);


    const click = (e) => {
        e.preventDefault();
        console.log(e.target.innerText.toLowerCase());

        if ((e.target.innerText.toLowerCase()) === 'register?') {
            e.target.innerText = 'login?'
            setSignVal('Sign up');
            setRegOrLog(!regOrLog);
        } else {
            e.target.innerText = 'register?';
            setSignVal('Sign In');
            setRegOrLog(regOrLog);
        }


    }


    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
            email,
            password,
            regOrLog
        });

        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className={style.root}>
                    <input value={email} type="text" className={style.input} required onChange={(e) => setEmail(e.target.value)} />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label className={style.label}>Email</label>
                </div>
                <div className={style.root}>
                    <input value={password} type="password" className={style.input} required onChange={(e) => setPassword(e.target.value)} />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label className={style.label}>Password</label>

                </div>
            </div>
            <div>
                <button value="Sign in">{signVal}</button>
                <button className={style.nonAactive} value="Register?" onClick={click}>Register?</button>
            </div>
        </form>


    );

};



export default LoginForm;