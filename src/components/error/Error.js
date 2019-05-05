import React from 'react';
import './Error.scss';

const Error = ({error, retry}) => {
    return retry
        ? <div className="Error" onClick={retry} style={{cursor: 'pointer'}}>{error}. Click this message to retry.</div>
        : <div className="Error">{error}. Click again to retry.</div>
};

export default Error;
