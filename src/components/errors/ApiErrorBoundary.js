import React, { useEffect, useState } from "react";
import { useError } from "../../hooks/useError";

function ApiErrorBoundary(props) {
    const apiError = useError();
    const [isError, setError] = useState(false);

    useEffect(() => {
        setError(apiError.apiError?.status != null);
    }, [apiError]);

    const { Cases, FallbackComponent } = props;

    if (isError){
        const Component = Cases.find((c)=>c.status==apiError.apiError.status)?.component;
        if (Component) return (
            <Component
                message={apiError.apiError.message}
            />
        );
        else return (
            <FallbackComponent
                message={apiError.apiError.message}
            />
        );
    }
    return (
        props.children
    )
}

export default ApiErrorBoundary;