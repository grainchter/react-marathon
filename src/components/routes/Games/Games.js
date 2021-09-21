import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start/Start";
import BoardPage from "./routes/Board/Board";
import FinishPage from "./routes/Finish/Finish";
import { PokemonContext } from "../../../context/PokemonContext";
import { useState } from "react";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    console.log(selectedPokemons);

    const match = useRouteMatch();

    const handleSelectedPokemons = (key, pokemon) => {
setSelectedPokemons(prevState => {
    if (prevState[key]) {
        const copyState = {...prevState};
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
            onSelectedPokemons: handleSelectedPokemons
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