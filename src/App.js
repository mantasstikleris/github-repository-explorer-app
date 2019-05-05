import React, {useReducer} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import RepositoryList from './components/repository-list/RepositoryList';
import reducers from './reducers';

const InnerRepository = ({state: {list}}) => <div>{list.clicked.name}</div>;

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
                    <Route exact path="/" render={() => <RepositoryList state={state} dispatch={dispatch}/>}/>
                    <Route path="/:id" render={
                        () => state.list.clicked
                            ? <InnerRepository state={state} dispatch={dispatch}/>
                            : <Redirect to="/"/>
                    }/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
