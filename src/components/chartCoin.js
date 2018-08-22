import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-svg-charts';

const styles = StyleSheet.create({
    chartContainer: {
        display: "flex",
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    }
});

const { chartContainer } = styles;

// class ChartCoin extends React.PureComponent {

//     render () {

//        const testData = Array.from({length: 24 }, (v,k) => Math.floor(Math.random() * 24)); 
//        return( <View>
//                 <LineChart
//                     style={{ height : 128 }}
//                     data={testData}
//                     svg={{ strokeWidth : 2, stroke : 'rgb(134,65,244)'}}
//                     contentInset={{ top : 20, bottom : 20}}
//                 >
//                 </LineChart>
//             </View>
//        );
//     }
// }

const ChartCoin = ({dataPrices = []}) => {
     
    return( 
        <View>
            <LineChart
                style={{ height : 128 }}
                data={dataPrices}
                svg={{ strokeWidth : 2, stroke : 'rgb(83, 207, 226)'}}
                contentInset={{ top : 20, bottom : 20}}
            >
            </LineChart>
        </View>
       );
    
};

export default ChartCoin;