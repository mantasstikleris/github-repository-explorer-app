import React, { useRef, useReducer, useEffect } from 'react';
import './RepositoryList.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faSearch, faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import reducer from './reducer';
import {useDebounce} from '../../common/utils';
import {DEBOUNCE_DELAY} from '../../common/constants';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import {fetchRepositories} from '../../api';
import Data from '../data/Data';

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

        return state.repositories.map((repository) => (
            <div className="RepositoryContainer" key={repository.id}>
                <div className="Column">
                    <div className="Row">
                        <div className="Name Ellipsis">{repository.name}</div>
                    </div>
                    <div className="Row">
                        {repository.license && <div className="Ellipsis">{repository.license}</div>}
                        <div className="Ellipsis">{repository.language}</div>
                    </div>
                </div>
                <div className="Column">
                    <div className="Row">
                        <div className="Description Ellipsis">{repository.description}</div>
                    </div>
                    <div className="Row">
                        <Data data={repository}/>
                    </div>
                </div>
                <div className="Column">
                    <Icon icon={repository.starred ? fasStar : farStar}/>
                </div>
            </div>
        ));
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
