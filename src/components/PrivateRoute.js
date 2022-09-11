import React from "react"
import { Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...others }) => {
    return (
        <Route>
            {...others}
        </Route>
    )
}

export default PrivateRoute
