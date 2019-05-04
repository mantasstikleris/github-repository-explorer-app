import React, { useRef } from 'react';
import './RepositoryList.scss';

const RepositoryList = () => {

    return (
        <div className="RepositoryList">
            <div className="SearchContainer">
                <div className="Search">
                    <input placeholder="Search"/>
                </div>
            </div>
        </div>
    );
};

export default RepositoryList;
