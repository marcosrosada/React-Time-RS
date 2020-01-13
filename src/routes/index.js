import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/signin" components={SignIn} />
            <Route path="/signup" components={SignUp} />
            <Route path="/" exact components={Main} />
        </Switch>
    </BrowserRouter>
);

export default Routes;