import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';

//Dev debugging
import devTools from 'remote-redux-devtools';
import logger from 'redux-logger';

//App & redux dependent 
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import RootReducers from './Reducers';

const middleware = applyMiddleware(thunk, promise, logger);

const Store = createStore(
    RootReducers, 
        compose(middleware, devTools({
            name: Platform.OS,
            hostname : 'localhost',
            port : 5678
        })
    )
);


export default Store;
