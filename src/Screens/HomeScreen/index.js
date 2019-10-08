/*
* Created by Shubham Singla on 08/10/2019
* contact on shubhamsinglas@gmail.com
*/

import React from 'react';
import {
   Text,
   View,
   Image,
   FlatList,
   StyleSheet,
   SafeAreaView,
   TouchableOpacity
 } from 'react-native';
import Helper from '../../Utils/Helper';
import Constants from '../../Utils/Constants';
import Enums from '../../Utils/Enums';
import PageLoadingSpinner from '../../Components/PageLoadingSpinner.js';
import PageLoadingText from '../../Components/PageLoadingText.js';
import {connect} from 'react-redux';
import API from '../../Communication/API';

class HomeScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      fetchedCMCrank: 0, // For tracking max Id fetch from API
      dataArray: [],
      apiRequestStatus: Enums.APIrequestStatus.Loading,
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async function(){

    try{

      // Static Data for testing //
      /*
      const dataArray = require('../../SampleData/CryptocurrencyListingsLatest.json');
      this.setState({
        dataArray: dataArray.data.slice(0, 100),
        apiRequestStatus: Enums.APIrequestStatus.Success
      })*/

      // Dynamic data from API
      const result = await API.getCryptocurrencyList(1, Constants.MaxCryptoInOneGo, 'USD');
      if(result.statusCode == 200){
        await this.setState({
          dataArray: result.data.slice(0, Constants.MaxCryptoInOneGo),
          apiRequestStatus: Enums.APIrequestStatus.Success
        })
        // Update fetched Ids length
        let count = this.state.dataArray.length
        this.setState({
          fetchedCMCrank: count
        })
      } else {
        this.setState({
          apiRequestStatus: Enums.APIrequestStatus.Failed
        })
      }
    } catch(e){
      console.warn("err10009", e.message);
    }

  }.bind(this)

  loadMoreData = async function(){
    try{

      // Static Data for testing //
      /*
      const dataArray = require('../../SampleData/CryptocurrencyListingsLatest.json');
      if(dataArray.data.length != this.state.dataArray.length){
        this.setState(prevState => ({
          dataArray: [...prevState.dataArray, ...dataArray.data.slice(prevState.dataArray.length, prevState.dataArray.length+100)]
        }))
      }
      */

      // Dynamic data from API
      let {fetchedCMCrank} = this.state;
      const result = await API.getCryptocurrencyList(fetchedCMCrank+1, Constants.MaxCryptoInOneGo, 'USD');
      if(result.statusCode == 200){
        await this.setState(prevState => ({
          dataArray: [...prevState.dataArray, ...result.data.slice(0, Constants.MaxCryptoInOneGo)],
          apiRequestStatus: Enums.APIrequestStatus.Success
        }))
        // Update fetched Ids length
        let count = this.state.dataArray.length
        this.setState({
          fetchedCMCrank: count
        })
      }


    } catch(e){
      console.warn("err10005", e.message);
    }
  }.bind(this)

  keyExtractor = (item, index) => (item.id+"");

  renderItem = ({item}) => {

    let percentChange1h = Helper.roundOff(item.quote.USD.percent_change_1h, 2);
    let percentChange24h = Helper.roundOff(item.quote.USD.percent_change_24h, 2);
    let percentChange7d = Helper.roundOff(item.quote.USD.percent_change_7d, 2);
    let price = Helper.roundOff(item.quote.USD.price, 2);
    let marketCap = Helper.roundOff(item.quote.USD.market_cap, 2);
    let vol24h = Helper.roundOff(item.quote.USD.volume_24h, 2);
    let url = Constants.CryptoImageUrl.replace('{id}', item.id);

    return(
      <TouchableOpacity style={{flexDirection: 'row', marginTop: 10, marginBottom: 7}} onPress={() => this.renderItemClick(item)} >
        <View>
          <Image
            style={{width: 50, height: 50, borderRadius: 25, margin: 10}}
            source={{uri: url}}
           />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, color: '#ffa600', marginBottom: 3}}>{item.name} ({item.symbol})</Text>
          <Text style={styles.textKey}>Price: <Text style={styles.textValue}>$ {price}</Text></Text>
          <Text style={styles.textKey}>Mcap: <Text style={styles.textValue}>$ {marketCap}</Text></Text>
          <Text style={styles.textKey}>Vol 24h: <Text style={styles.textValue}>$ {vol24h}</Text></Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 3, marginRight: 10}}>
            <Text style={styles.textKey}>1h <Text style={[
              styles.textPercentInc,
              percentChange1h < 0? styles.textPercentDesc: []
            ]}>{percentChange1h}</Text></Text>
            <Text style={styles.textKey}>1h <Text style={[
              styles.textPercentInc,
              percentChange24h < 0? styles.textPercentDesc: []
            ]}>{percentChange24h}</Text></Text>
            <Text style={styles.textKey}>1h <Text style={[
              styles.textPercentInc,
              percentChange7d < 0? styles.textPercentDesc: []
            ]}>{percentChange7d}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderItemClick = (item) => {
    this.props.addCryptoName(item.name)
    this.props.navigation.navigate('DetailsScreen', {
      id: item.id
    })
  }

  renderItemSeparator = () => {
    return(
      <View style={{height: 1, width: '100%', backgroundColor: 'darkgray'}}></View>
    )
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Home</Text>
          </View>

          {/* Body */}
          {this.state.apiRequestStatus == Enums.APIrequestStatus.Loading && (
            <PageLoadingSpinner />
          )}
          {this.state.apiRequestStatus == Enums.APIrequestStatus.Failed && (
            <PageLoadingText message={'Network Error! try after some time'} />
          )}
          {this.state.apiRequestStatus == Enums.APIrequestStatus.Success && (
            <FlatList
              data={this.state.dataArray}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderItemSeparator}
              onEndReachedThreshold={0.6}
              onEndReached={(this.loadMoreData)}
             />
          )}
        </View>

      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#303030'
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white'
  },
  textKey: {
    color: '#ffe4c5',
    fontSize: 15
  },
  textValue: {
    color: 'white',
    fontWeight: 'bold'
  },
  textPercentInc: {
    color: '#51ff0d',
    fontWeight: 'bold'
  },
  textPercentDesc: {
    color: '#c8362e',
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCryptoName: (value) => dispatch({
      type: "ADD_CRYPTO_NAME",
      payload: value
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
