import React from 'react';
import './Data.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faExclamation, faLevelUpAlt, faStar as fasStar, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faClock as farClock} from '@fortawesome/free-regular-svg-icons';

const SingleData = ({icon, value}) => {
    return (
        <div className="SingleData">
            <Icon icon={icon} />
            {value && value.toLocaleString()}
        </div>
    );
};

const Data = ({data: {stars, forks, contributors, issues}, effectiveHours}) => (
    <div className="Data">
        {effectiveHours && <SingleData icon={farClock} value={effectiveHours} />}
        <SingleData icon={fasStar} value={stars}/>
        <SingleData icon={faLevelUpAlt} value={forks}/>
        {contributors && <SingleData icon={faUsers} value={contributors}/>}
        <SingleData icon={faExclamation} value={issues}/>
    </div>
);

export default Data;
