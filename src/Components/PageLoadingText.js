import React, {Component} from 'react';
import {View, Text} from "react-native";

export default PageLoadingText = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text note style={{fontSize: 20, color: 'white', textAlign:'center'}}>{props.message}</Text>
    </View>
  )
}
