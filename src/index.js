import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import Router from './router';
import reducers from './_reducers';

// create a store from the reducers
let store = createStore(reducers);


// render to id app
ReactDOM.render(<Router store={store}/>, document.getElementById('app'));

// for hot reload
if(module.hot){
    module.hot.accept();

}
