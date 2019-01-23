'use strict';

import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,ScrollView} from "react-native";
import style from "./style";
import css from '@styles/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Components } from 'expo';

import fun from '@functions/common'

export default class SingleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup:this.props.display
    }
  }


  render() {
    return (
       <View style={[style.singleImageWrapper]}>
           <Image source={{uri:this.props.url}} style={[style.singleImage,{"overflow":"hidden",borderRadius:css.dynamic.general.rounded+""=="true"?4:0}]}></Image>
       </View>
    );
  }
}
