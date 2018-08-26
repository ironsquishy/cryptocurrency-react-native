import Axios from 'axios';
import QS from 'query-string';

import { CoinBaseProEndpoint, CoinBaseProducts } from '../Utils/Constants';


export default async function (){

    var promises = [];


    try {
        // promises = returnAllPromises();
        // return await Axios.all(promises);
        var response = await Axios.all(returnAllPromises());
        var outData  = {};
        for(var i = 0; i < response.length; i++){
            Object.assign(outData, response[i].data);
        }
        return outData;
    } catch (err) {
        if(!err){
            return {error: 1, message: 'No value for error was returned...'};
        }
        return err;
    }

    function returnAllPromises(){
        return CoinBaseProducts.map((val, index) => {
            return Axios.get(constructProductURL(CoinBaseProEndpoint, val),{
                transformResponse: [function(_data){
                    var outData = {};
                    outData[val] = JSON.parse(_data);
                    return outData;
                }]
            })
        })
    }

    function nowYesterday_ISO(){
        return new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString();
    }
    
    function minuteOldNow_ISO(){
        return new Date( Date.now() - 1000 * 60 ).toISOString();
    }

    function constructProductURL(_endpoint, _product){
        if (!_endpoint || !_product){
            return '';
        }
        var outUrl = `${_endpoint}/products/${_product}-USD/candles?`;

        var cbParams = {};
        cbParams.start = nowYesterday_ISO();
        cbParams.end = minuteOldNow_ISO();
        cbParams.granularity = 3600;
        
        return outUrl + QS.stringify(cbParams);
    }
}