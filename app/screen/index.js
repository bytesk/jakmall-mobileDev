import * as React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers';


import HomeScreen from './Home';

export default function App() {
    const store = createStore(reducers, applyMiddleware(thunk))

    return (
        <Provider store={store}>
            <HomeScreen/>
        </Provider>
    );
}
