import React, {useContext} from 'react';
import './StarButton.scss';
import {Context} from '../../App';
import {fetchAddRemoveStar} from '../../api';
import Error from '../error/Error';
import Loader from '../loader/Loader';

const StarButton = () => {
    const {state: {list: {clicked: repository}, button}, dispatch} = useContext(Context);

    const onButtonClick = () => {
        dispatch({type: 'SET_BUTTON_LOADING'});

        fetchAddRemoveStar(repository.name, button.starred ? "DELETE" : "PUT")
            .then(() => dispatch({type: 'SET_BUTTON_SUCCESS'}))
            .catch(error => dispatch({type: 'SET_BUTTON_ERROR', error: error.message}));
    };

    return (
        <div className="StarButton">
            {button.error && <Error error={button.error}/>}
            {button.loading && <Loader size="xs"/>}
            <button onClick={onButtonClick}>
                {button.starred ? 'un-star' : 'star'}
            </button>
        </div>
    );
};

export default StarButton;
