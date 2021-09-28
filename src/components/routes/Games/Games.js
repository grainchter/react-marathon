import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start/Start";
import BoardPage from "./routes/Board/Board";
import FinishPage from "./routes/Finish/Finish";
import { PokemonContext } from "../../../context/PokemonContext";
import { useState } from "react";
import { useEffect } from "react";
import NotFoundPage from "./../../../components/routes/NotFound/NotFound";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [selectedPokemons2, setSelectedPokemons2] = useState({});
    const [comp, setComp] = useState();

    useEffect(async () => {
        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const player2Request = await player2Response.json();
        

        setSelectedPokemons2(() => {
            return player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            })
            )
        });



    }, [])

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
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            pokemons2: selectedPokemons2,
            onSelectedPokemons: handleSelectedPokemons,
            clean
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;