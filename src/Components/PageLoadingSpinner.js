import React from 'react';
import {View, Text, ActivityIndicator} from "react-native";

export default PageLoadingSpinner = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  )
}
