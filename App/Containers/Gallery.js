/*
  Created by Dimov Daniel
  Mobidonia
  daniel@mobidonia.com
*/
import React, {Component} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,AsyncStorage} from "react-native";
import Navbar from '@components/Navbar'
import firebase from '@datapoint/Firebase'
import css from '@styles/global'
import T from '@functions/translation'
import RNIGallery from 'react-native-image-gallery';


export default class Gallery extends Component {

  //The constructor
  constructor(props) {
    super(props);

    console.log("---PHOTOS ---")
    console.log(this.props.navigation.state.params.data);

    //Set the state
    this.state = {
      data:this.props.navigation.state.params.data,
      index:this.props.navigation.state.params.index,
    }
  }

  //Component Mount function
  componentDidMount(){
  }

  render() {
    return (
        <View style={[{flex:1},css.layout.containerBackground]}>
          <Navbar navigation={this.props.navigation} isRoot={ false} showRightButton={false}  />
          <RNIGallery
            style={{ flex: 1 }}
            initialPage={this.state.index}
            images={this.state.data}
          />
        </View>
      )
  }

}
