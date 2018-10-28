import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/common/Header';
import List from './components/list/List'
import './index.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Notfound from './components/notfound/Notfound';
import Detail from './components/detail/Detail';


const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={List} exact />
                    {/*This is dynamic path in Router*/}
                    <Route path="/currency/:id"component={Detail} exact/>
                    <Route component={Notfound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);