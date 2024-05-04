import React from "react";
import { useNavigate } from "react-router-dom";

const withRouter = (WrappedComponent: React.ComponentState) => {
    const ComponentWithRouterProp = (Props: object) => {
        let navigate = useNavigate();

        return <WrappedComponent {...Props} navigate={navigate} />;
    }

    return ComponentWithRouterProp;
}

export default withRouter