import {
    combineReducers
} from 'redux';

import { loading, success, failed } from './processor'
import {listDataHome} from './listDataHome';


const reducers = combineReducers( {
    loading,
    success,
    failed,
    listDataHome,
})


export default reducers
