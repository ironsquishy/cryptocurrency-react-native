import Axios from 'axios';
import QS from 'query-string';

import { CoinBaseProEndpoint, CoinBaseProducts } from '../Utils/Constants';


export default async function (){

    var promises = [];


    try {
        promises = returnAllPromises();
        return await Axios.all(promises);
    } catch (err) {
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

    function ProcessData_Coinbase(data){
        if(!data) return {};
    
        var outData = {};
        outData.candles = ParseData(data);
    
        outData.historic_price1h = AggregatePrice_Data(data);
    
        return outData;
    }

    function constructProductURL(_endpoint, _product){
        if (!_endpoint || !_product){
            return '';
        }
        var outUrl = `${_endpoint}/products/${_product}/candles?`;

        var cbParams = {};
        cbParams.start = nowYesterday_ISO();
        cbParams.end = minuteOldNow_ISO();
        cbParams.granularity = 3600;
        
        return outUrl + QS.stringify(cbParams);
    }

    function constructProductURL_All(_products){
        if(!_products){
            return [];
        }
        return CoinBaseProducts.map((val, index) => constructProductURL(CoinBaseProEndpoint,val));
    }

}