import React, { useRef } from 'react';
import './RepositoryList.scss';

const RepositoryList = () => {
    const searchRef = useRef('');

    return (
        <div className="RepositoryList">
            <div className="SearchContainer">
                <div className="Search">
                    <input placeholder="Search" ref={searchRef}/>
                </div>
            </div>
        </div>
    );
};

export default RepositoryList;
