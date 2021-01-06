import React from 'react';
import '@cds/core/modal/register';
import '@clr/ui/clr-ui.min.css';
import '@clr/icons/clr-icons.min.css';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './components/login/Login';
import Home from './components/home/Home';
import Unauthorized from './components/unauthorized/Unauthorized';

import NotAuthRoutesEnum from './enums/NotAuthRoutesEnum';

import NoAuthRoute from './routes/NoAuthRoute';
import UserRoute from './routes/UserRoute';
import UserRoutesEnum from './enums/UserRoutesEnum';
import AdminRoutesEnum from './enums/AdminRoutesEnum';
import AdminRoute from './routes/AdminRoute';
import OperatorStore from './components/operatorStore/OperatorStore';
import ServiceStore from './components/servicestore/serviceStore';
import PageNotFound from './components/pageNotFound/PageNotFound';

interface Props {
  testProp?: string;
}

interface State {
  counter: number;
}

class App extends React.PureComponent<Props, State> {
  render() {
    return (
      <Router>
        <Switch>
          <NoAuthRoute exact path={NotAuthRoutesEnum.LOGIN} component={Login} />

          <UserRoute exact path={UserRoutesEnum.HOME} component={Home} />
          <UserRoute exact path={UserRoutesEnum.SERVICESTORE} component={ServiceStore} />
          <UserRoute exact path={UserRoutesEnum.UNAUTHORIZED} component={Unauthorized} />

          <AdminRoute exact path={AdminRoutesEnum.OPERATORSTORE} component={OperatorStore} />

          <Route exact path={NotAuthRoutesEnum.PAGENOTFOUND} component={PageNotFound} />
          <Redirect to={NotAuthRoutesEnum.LOGIN} />
        </Switch>
      </Router>
    );
  }
}

export default App;
