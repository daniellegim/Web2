import React, { useContext } from "react";
import { Route } from "react-router-dom";
import {AuthContext} from "./auth-provider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <navigate to={"/login"} />
                )
            }
        />
    );
};


export default PrivateRoute
