import React, {useContext} from 'react';
import './RepositoryView.scss';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {Context} from '../../App';
import Data from '../data/Data';

const RepositoryView = () => {
    const {state: {list: { clicked: repository }}} = useContext(Context);

    return (
        <div className="RepositoryView">
            <div className="HeaderContainer">
                <div className="Name Ellipsis">{repository.name}</div>
            </div>
            <div className="RepositoryContainer">
                <div className="Row">
                    <div className="Description Ellipsis">{repository.description}</div>
                    <Icon icon={repository.starred ? fasStar : farStar}/>
                </div>
                <div className="Row">
                    <div className="Details">
                        {repository.license && <div className="Ellipsis">{repository.license}</div>}
                        <div className="Ellipsis">{repository.language}</div>
                    </div>
                    <Data data={repository}/>
                </div>
            </div>
        </div>
    );
};

export default RepositoryView;
