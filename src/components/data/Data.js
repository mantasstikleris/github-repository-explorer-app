import React from 'react';
import './Data.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faExclamation, faLevelUpAlt, faStar as fasStar, faUsers} from "@fortawesome/free-solid-svg-icons";

const SingleData = ({icon, value}) => {
    return (
        <div className="SingleDataContainer">
            <Icon icon={icon} />
            {value && value.toLocaleString()}
        </div>
    );
};

const Data = ({data: {stars, forks, contributors, issues}}) => {
    return (
        <div className="DataContainer">
            <SingleData icon={fasStar} value={stars} />
            <SingleData icon={faLevelUpAlt} value={forks} />
            {contributors && <SingleData icon={faUsers} value={contributors} />}
            <SingleData icon={faExclamation} value={issues} />
        </div>
    );
};

export default Data;
