import { useState } from "react/cjs/react.development";
import HomePage from "./components/routes/Home/Home";
import GamePage from "./components/routes/Games/Games";
import { useLocation, Redirect, Route, Switch, useRouteMatch } from "react-router";
import MenuHeader from "./components/header/MenuHeader/MenuHeader";
import Footer from "./components/footer/Footer";
import cn from 'classnames';
import AboutPage from "./components/routes/About/About";
import ContactPage from "./components/routes/Contact/Contact";
import NotFoundPage from "./components/routes/NotFound/NotFound";

import style from './style.module.css';
import Firebase from "./service/firebase";

import { FireBaseContext } from "./context/FireBaseContext";

const App = () => {

  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board' || location.pathname === '/home';


  return (
    <FireBaseContext.Provider value = {new Firebase}>
      <Switch>
        <Route path='/404' component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(style.wrap, {
              [style.isHomePage]: isPadding
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                {/* <Route path="/home" render={() => (
                <Redirect to="/" />
              )} /> */}
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (
                  <Redirect to="/404" />
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
    </FireBaseContext.Provider>

  );


};

export default App;
