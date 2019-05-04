import React from 'react';
import './Loader.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';

const Loader = ({size = "lg"}) => (
    <div className="LoaderContainer">
        <Icon icon={faCircleNotch} size={size} />
    </div>
);

export default Loader;
