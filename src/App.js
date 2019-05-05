import React, {useReducer} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import RepositoryList from './components/repository-list/RepositoryList';
import RepositoryView from './components/repository-view/RepositoryView';
import reducers from './reducers';

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
        button: {
            starred: null
        }
    });

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Context.Provider value={{state, dispatch}}>
                        <Route exact path="/" render={() => <RepositoryList/>}/>
                        <Route path="/:id" render={
                            () => state.list.clicked ? <RepositoryView/> : <Redirect to="/"/>
                        }/>
                    </Context.Provider>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
