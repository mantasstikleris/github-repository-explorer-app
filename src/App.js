import React, {useReducer, useContext} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import RepositoryList from './components/repository-list/RepositoryList';
import reducers from './reducers';

const InnerRepository = () => {
    const {state: {list}} = useContext(Context);

    return <div>{list.clicked.name}</div>;
};

export const Context = React.createContext(null);

function App() {
    const [state, dispatch] = useReducer(reducers, {
        search: {
            query: ''
        },
        list: {
            loaded: [],
            clicked: null,
            loading: false,
            error: null
        },
    });

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Context.Provider value={{state, dispatch}}>
                        <Route exact path="/" render={() => <RepositoryList/>}/>
                        <Route path="/:id" render={
                            () => state.list.clicked ? <InnerRepository/> : <Redirect to="/"/>
                        }/>
                    </Context.Provider>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
