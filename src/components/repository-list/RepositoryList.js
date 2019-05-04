import React, { useRef } from 'react';
import './RepositoryList.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const RepositoryList = () => {
    const searchRef = useRef('');

    return (
        <div className="RepositoryList">
            <div className="SearchContainer">
                <div className="Search">
                    <Icon icon={faSearch}/>
                    <input placeholder="Search" ref={searchRef}/>
                </div>
            </div>
        </div>
    );
};

export default RepositoryList;
