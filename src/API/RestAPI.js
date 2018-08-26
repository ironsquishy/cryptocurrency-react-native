import Axios from 'axios';
import Bluebird from 'bluebird';
import qString from 'query-string';

import FetchAllCoinbaseData from './coinbase.api';

import { CoinMarketCap , CoinbBasePro, CoinBaseProEndpoint, CoinBaseProducts } from '../Utils/Constants';



export default async function (){
    var coinmarketPromise, coinBaseProPromise;

    var coinBaseProURL = CoinBaseProEndpoint + '/products/BTC-USD/candles?';
    var cbParams ={};
    cbParams.start = nowYesterday_ISO();
    cbParams.end = minuteOldNow_ISO();
    cbParams.granularity = 3600;

    
    try {
        coinmarketPromise = await Axios.get(CoinMarketCap);
        //coinBaseProPromise = await Axios.get(coinBaseProURL, { params : cbParams});
        coinBaseProData = await FetchAllCoinbaseData();
        
        return MergeData(coinmarketPromise.data, coinBaseProData);
    } catch (err){
        console.warn(err);
        return err;
    }

    function MergeData (coinMarketCapData, coinBaseProData) {
        var outData = {};
        outData.CoinBase = ProcessData_Coinbase_ENH(coinBaseProData);
        outData.CoinMarketCap = ProcessData_CoinMarketCap(coinMarketCapData);

        return outData;
    }

    function ParseData(data){
    
        var parsedData = []
        for(var i = 0; i < data.length; i++){
            //[ time, low, high, open, close, volume ]
            parsedData[parsedData.length] = {
                time: new Date(data[i][0]).toLocaleString(),
                low: data[i][1],
                high: data[i][2],
                open : data[i][3],
                close : data[i][4],
                volume : data[i][5]
            };
        }
    
        return parsedData;
    }

    function AggregatePrice_Data(data){
        //[ time, low, high, open, close, volume ]
        var thisArray = [];
        for(var i = 0; i < data.length; i++){
            thisArray[thisArray.length] = data[i][4];
        }
        return thisArray;
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

    function ProcessData_Coinbase_ENH(_data){
        if(!_data){
            return {};
        }

        var outData = {};
        
        //Bubble up _data key into outData.
        for(var k in _data){
            outData[k] = {};
            outData[k].candles = ParseData(_data[k]);
            outData[k].historic_price1h = AggregatePrice_Data(_data[k]);
        }

        return outData;
    }
    
    function ProcessData_CoinMarketCap(data){
        if(!data) return {};
    
        return data.reduce((result, val) => {
            if(val.symbol == 'BTC')
                result.push(val);
    
            else if(val.symbol == 'LTC')
                result.push(val);
            
            else if (val.symbol == 'ETH')
                result.push(val);
            
            return result;
        }, []);
    
    }

    function testOperations () {

        setTimeout(()=>{
            // FetchAllCoinbaseData()
            // .then(res => console.log('Coinbase All Data:', res))
            // .catch(err => console.log('Coinbase All Data Failed:', err));
            FetchAllCoinbaseData()
            .then(response => {
                console.log('Coinbase', ProcessData_Coinbase_ENH(response));
            })
            .catch(err => console.log('Coinbase Error :', err))
        }, 5000);
    
    }
}



