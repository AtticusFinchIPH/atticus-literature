import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin
    return (
        <Route {...rest} render={props => (
            userInfo ? <Component {...props} /> : <Redirect to="/signin" />
        )} />
    );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin
    return (
        <Route {...rest} render={props => (
            userInfo && restricted ? <Redirect to="/" /> : <Component {...props} />
        )} />
    );
};

export { PrivateRoute, PublicRoute };