import React, { useRef, useReducer, useEffect } from 'react';
import './RepositoryList.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import reducer from './reducer';
import {useDebounce} from '../../common/utils';
import {DEBOUNCE_DELAY} from '../../common/constants';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import {fetchRepositories} from '../../api';

const RepositoryList = () => {
    const [state, dispatch] = useReducer(reducer, {
        searchQuery: '',
        repositories: [],
        loading: false,
        error: null
    });

    const searchRef = useRef('');
    const debounceSearchQuery = useDebounce(state.searchQuery, DEBOUNCE_DELAY);

    const loadRepositoryData = () => {
        if (state.searchQuery.length < 2) {
            return;
        }

        dispatch({type: 'SET_LOADING'});

        fetchRepositories(state.searchQuery)
            .then(repositories => dispatch({type: 'SET_REPOSITORIES', repositories}))
            .catch(error => dispatch({type: 'SET_ERROR', error: error.message}));
    };

    useEffect(loadRepositoryData, [debounceSearchQuery]);

    const List = () => {
        if (state.loading) {
            return <Loader/>
        }

        if (state.error) {
            return <Error error={state.error} retry={loadRepositoryData}/>
        }

        return (
            <ul>
                {
                    state.repositories.map(repository => <li key={repository.id}>{repository.name}</li>)
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
