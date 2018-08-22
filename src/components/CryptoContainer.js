import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
//import Spinner from 'react-native-loading-spinner-overlay';

import CoinCard  from './CoinCard';
import ChartCoin from './chartCoin';

import FetchCoinData from './../Actions/FetchCoinData';

const styles = {
    contentContainer : {
        paddingBottom : 100,
        paddingTop : 55
    }
}

class CryptoContainer extends Component {
    componentDidMount () {
        this.props.FetchCoinData();
    }

    renderCoinCard () {
        const { crypto } = this.props;
        console.log('Inside coin card', crypto.data.CoinMarketCap);
        return crypto.data.CoinMarketCap.map((coin, index) => 
                <View key={index}>
                <ChartCoin dataPrices={crypto.data.CoinBase.historic_price1h}/>
                <CoinCard 
                    coin_name={coin.name}
                    symbol={coin.symbol}
                    price_usd={coin.price_usd}
                    percent_change_24h={coin.percent_change_24h}
                    percent_change_7d={coin.percent_change_7d}
                />
                </View>
               
        );
    
    }
    render() {
        const { crypto } = this.props;

        if(crypto.isFetching){
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
                // <View>
                //     <Spinner 
                //         visible={crypto.isFetching}
                //         textContent={"Loading..."}
                //         textStyle={{color : "#253145"}}
                //         animation="fade"
                //     />
                // </View>
            );
        }
        
        return (
            
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {this.renderCoinCard()}
            </ScrollView>
        );
    }

}

function mapStateToProps(state){
    return {
        crypto : state.crypto
    }
};

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer);