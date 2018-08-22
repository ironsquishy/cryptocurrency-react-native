import Axios from 'axios';

import { apiBaseURL } from '../Utils/Constants';

import FetchAllData from '../API/RestAPI';

import FetchAllCoinbaseData from '../API/coinbase.api';

import {
    FETCHING_COIN_DATA, 
    FETCHING_COIN_DATA_SUCCESS, 
    FETCHING_COIN_DATA_FAIL
} from '../Utils/ActionTypes';

export default function FetchCoinData(){
   
    return dispatch => {
        dispatch({type : FETCHING_COIN_DATA});

        FetchAllCoinbaseData()
        .then(res => console.log('CB All Data:', res))
        .catch(err => console.log('CB All Data Failed:', err));
    
        return FetchAllData()
        .then(res => {

            // dispatch({ type: FETCHING_COIN_DATA_SUCCESS, payload : res.data})
            dispatch({ type: FETCHING_COIN_DATA_SUCCESS, payload : res})
        })
        .catch(err => {
            dispatch({ type: FETCHING_COIN_DATA_FAIL, payload : err.data })
        })
    }
}
