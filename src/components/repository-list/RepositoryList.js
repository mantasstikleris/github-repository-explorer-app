import React, { useRef, useReducer, useEffect } from 'react';
import './RepositoryList.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import reducer from './reducer';
import {useDebounce} from '../../common/utils';
import {DEBOUNCE_DELAY, ITEMS_PER_PAGE} from '../../common/constants';
import Loader from '../loader/Loader';

const RepositoryList = () => {
    const [state, dispatch] = useReducer(reducer, {
        searchQuery: '',
        repositories: [],
        loading: false
    });

    const searchRef = useRef('');
    const debounceSearchQuery = useDebounce(state.searchQuery, DEBOUNCE_DELAY);

    const loadRepositoryData = () => {
        if (state.searchQuery.length < 2) {
            return;
        }

        dispatch({type: 'SET_LOADING'});

        fetch(`https://api.github.com/search/repositories?q=${state.searchQuery}&per_page=${ITEMS_PER_PAGE}`)
            .then(response => response.json())
            .then(data => dispatch({type: 'SET_REPOSITORIES', repositories: data.items}));
    };

    useEffect(loadRepositoryData, [debounceSearchQuery]);

    const List = () => {
        if (state.loading) {
            return <Loader/>
        }

        return (
            <ul>
                {
                    state.repositories.map(repository => <li key={repository.id}>{repository.full_name}</li>)
                }
            </ul>
        );
    };

    return (
        <div className="RepositoryList">
            <div className="SearchContainer">
                <div className="Search">
                    <Icon icon={faSearch}/>
                    <input placeholder="Search" ref={searchRef} onChange={() => dispatch({type: 'SET_SEARCH_QUERY', searchQuery: searchRef.current.value})}/>
                </div>
            </div>
            <div className="ListContainer">
                <List />
            </div>
        </div>
    );
};

export default RepositoryList;
