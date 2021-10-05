import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import PrivateRoute from './components/PrivateRoutes/PrivateRoutes';
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
import { useEffect } from 'react';
import { getUserAsync, selectUserLoading } from './store/user';
import { useDispatch, useSelector } from 'react-redux';
import UserPage from './components/routes/User/User';


const App = () => {

  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board' || location.pathname === '/home';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  if (isUserLoading) {
    return 'Loading';
  }

  return (

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
              <PrivateRoute path="/game" component={GamePage} />
              <PrivateRoute path="/about" component={AboutPage} />
              <PrivateRoute path="/user" component={UserPage} />
              <Route path="/contact" component={ContactPage} />
              <Route render={() => (
                <Redirect to="/404" />
              )} />
            </Switch>
          </div>
          <Footer />
          <NotificationContainer />
        </>
      </Route>
    </Switch>


  );


};

export default App;
