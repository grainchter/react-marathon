import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start/Start";
import BoardPage from "./routes/Board/Board";
import FinishPage from "./routes/Finish/Finish";
import { useState } from "react";
import { useEffect } from "react";
import NotFoundPage from "./../../../components/routes/NotFound/NotFound";
// import { useDispatch, useSelector } from 'react-redux';
// import { getPokemonsData } from './../../../store/pokemons2';

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [selectedPokemons2, setSelectedPokemons2] = useState({});
    const [comp, setComp] = useState();


    const clean = () => {
        setSelectedPokemons({});
        setSelectedPokemons2({});
    }

    const match = useRouteMatch();

    const handleSelectedPokemons = (key, pokemon) => {
        setSelectedPokemons(prevState => {
            if (prevState[key]) {
                const copyState = { ...prevState };
                delete copyState[key];

                return copyState;
            }

            return {
                ...prevState,
                [key]: pokemon,
            }
        })
    }



    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
    );
};

export default GamePage;