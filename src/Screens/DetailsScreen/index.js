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
   ScrollView,
   StyleSheet,
   SafeAreaView,
   TouchableOpacity
 } from 'react-native';
import Helper from '../../Utils/Helper';
import Constants from '../../Utils/Constants';
import Enums from '../../Utils/Enums';
import API from '../../Communication/API';
import {connect} from 'react-redux';

class DetailsScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      description: ``
    }
    this.nav = {
      id: this.props.navigation.getParam('id')
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async function(){

    // Static Data for testing //
    /*
    const dataArray = require('../../SampleData/CryptocurrencyMetadata.json');
    let description = '';
    let data = dataArray.data[this.nav.id];
    if(data){
      description = data.description
    }
    this.setState({
      description: description
    })
    */

    try{
      const result = await API.getCryptocurrencyMetadata(this.nav.id);
      if(result.statusCode == 200){
        let description = '';
        let data = result.data[this.nav.id];
        if(data){
          description = data.description
        }
        this.setState({
          description: description
        })
      }
    } catch(e){
      console.warn("err10009", e.message);
    }

  }.bind(this)

  render(){

    let leftIcon = require('../../Resources/Images/left_icon.png')
    let url = undefined;
    if(this.nav.id){
      url = Constants.CryptoImageBigUrl.replace('{id}', this.nav.id);
    }

    return(
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
        <View style={styles.content}>

          {/* Header */}
          <View style={styles.header}>
             <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginLeft: 10, padding: 5}}>
              <Image style={{width: 30, height: 30, marginRight: 5}} source={leftIcon} />
             </TouchableOpacity>
            <Text style={styles.headerTitle}>{this.props.cryptoName}</Text>
          </View>

          {/* Content */}
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 50}}>
            <Image style={{width: 200, height: 200}} source={{uri: url}} />
          </View>
          <Text style={styles.description}>{this.state.description}</Text>

        </View>
        </ScrollView>
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
  description: {
    color: 'white',
    fontSize: 16,
    margin: 10
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white'
  },
  scroll: {
    flex: 1,
    backgroundColor: '#303030',
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
    return{
      cryptoName: state.cryptoName
    }
}

export default connect(mapStateToProps)(DetailsScreen);
