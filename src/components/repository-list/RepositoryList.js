import React, { useRef, useReducer, useEffect } from 'react';
import './RepositoryList.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import reducer from './reducer';

const RepositoryList = () => {
    const searchRef = useRef('');
    const [state, dispatch] = useReducer(reducer, {
       searchQuery: ''
    });

    const loadRepositoryData = () => {
        if (state.searchQuery.length < 2) {
            return;
        }

        console.log(state.searchQuery);
    };

    useEffect(loadRepositoryData, [state.searchQuery]);

    return (
        <div className="RepositoryList">
            <div className="SearchContainer">
                <div className="Search">
                    <Icon icon={faSearch}/>
                    <input placeholder="Search" ref={searchRef} onChange={() => dispatch({type: 'SET_SEARCH_QUERY', searchQuery: searchRef.current.value})}/>
                </div>
            </div>
        </div>
    );
};

export default RepositoryList;
