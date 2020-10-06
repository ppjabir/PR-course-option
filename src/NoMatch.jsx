import React from "react";
import {Container} from "react-bootstrap";
import { useLocation } from "react-router-dom";
export const NoMatch = () => {
    let location = useLocation();
    return (
        <Container>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </Container>
    );
}