import { Navigate } from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "./auth-provider";

const WithPrivateRoute = ({ children }) => {
    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default WithPrivateRoute;
