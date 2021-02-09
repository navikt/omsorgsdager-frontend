import {AlertStripeFeil} from 'nav-frontend-alertstriper';
import React from 'react';

interface ApiErrorMessageProps {
    response: Response;
}

const ApiErrorMessage: React.FunctionComponent<ApiErrorMessageProps> = props => {
    return <AlertStripeFeil>
        Det har oppstått en teknisk feil.<br/>
        Status: {props.response.status} {props.response.statusText}
    </AlertStripeFeil>;
};

export default ApiErrorMessage;