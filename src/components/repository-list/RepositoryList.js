import React, {useRef, useEffect, useContext} from 'react';
import './RepositoryList.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faSearch, faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {useDebounce} from '../../common/utils';
import {DEBOUNCE_DELAY} from '../../common/constants';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import {fetchRepositories} from '../../api';
import Data from '../data/Data';
import {Link} from 'react-router-dom';
import {Context} from '../../App';

const RepositoryList = () => {
    const {state: {search, list}, dispatch} = useContext(Context);
    const searchRef = useRef('');
    const debounceSearchQuery = useDebounce(search.query, DEBOUNCE_DELAY);

    const loadRepositoryData = () => {
        if (search.query.length < 2) {
            return;
        }

        dispatch('SET_LOADING');

        fetchRepositories(search.query)
            .then(repositories => dispatch({type: 'SET_REPOSITORIES', repositories}))
            .catch(error => dispatch({type: 'SET_ERROR', error: error.message}));
    };

    useEffect(loadRepositoryData, [debounceSearchQuery]);

    const List = () => {
        if (list.loading) {
            return <Loader/>
        }

        if (list.error) {
            return <Error error={list.error} retry={loadRepositoryData}/>
        }

        return list.loaded.map((repository) => {
            const {id, name, license, language, description, starred} = repository;

            return (
                <Link to={`/${id}`} key={id} onClick={() => dispatch({type: 'SET_REPOSITORY', id})}>
                    <div className="RepositoryContainer">
                        <div className="Column">
                            <div className="Row">
                                <div className="Name Ellipsis">{name}</div>
                            </div>
                            <div className="Row">
                                {license && <div className="Ellipsis">{license}</div>}
                                <div className="Ellipsis">{language}</div>
                            </div>
                        </div>
                        <div className="Column">
                            <div className="Row">
                                <div className="Description Ellipsis">{description}</div>
                            </div>
                            <div className="Row">
                                <Data data={repository}/>
                            </div>
                        </div>
                        <div className="Column">
                            <Icon icon={starred ? fasStar : farStar}/>
                        </div>
                    </div>
                </Link>
            );
        });
    };

    return (
        <div className="RepositoryList">
            <div className="SearchContainer">
                <div className="Search">
                    <Icon icon={faSearch}/>
                    <input placeholder="Search" ref={searchRef} onChange={() => dispatch({type: 'SET_SEARCH_QUERY', query: searchRef.current.value})}/>
                </div>
            </div>
            <div className="ListContainer">
                <List />
            </div>
        </div>
    );
};

export default RepositoryList;
