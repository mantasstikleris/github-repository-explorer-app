import React, {useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import RepositoryList from './components/repository-list/RepositoryList';

const InnerRepository = ({repository}) => <div>{repository.name}</div>;

function App() {
    const [repository, setRepository] = useState(null);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <RepositoryList setRepository={setRepository}/>}/>
                    <Route path="/:id" render={() => (repository ? <InnerRepository repository={repository}/> : <Redirect to="/"/>)}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
