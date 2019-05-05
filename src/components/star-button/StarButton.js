import React, {useContext} from 'react';
import './StarButton.scss';
import {Context} from '../../App';

const StarButton = () => {
    const {state: {button}, dispatch} = useContext(Context);


    return (
        <div className="StarButtonContainer">
            <button onClick={() => dispatch({type: 'SET_BUTTON_SUCCESS'})}>
                {button.starred ? 'un-star' : 'star'}
            </button>
        </div>
    );
};

export default StarButton;
