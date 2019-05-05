import React, {useContext} from 'react';
import './RepositoryView.scss';
import {Context} from '../../App';

const RepositoryView = () => {
    const {state: {list}} = useContext(Context);

    return <div>{list.clicked.name}</div>;
};

export default RepositoryView;
