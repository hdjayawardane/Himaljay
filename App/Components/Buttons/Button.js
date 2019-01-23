'use strict';

import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import style from "./style";
import css from '@styles/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Components } from 'expo';

import fun from '@functions/common'

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup:this.props.display
    }
  }


  render() {
    return (
      <View  style={[{flex:1}]}>
        <TouchableOpacity style={[style.button, this.props.style,{backgroundColor:css.dynamic.general.buttonColor,borderColor:css.dynamic.general.buttonBorderColor},{"overflow":"hidden",borderRadius:css.dynamic.general.rounded+""=="true"?3:0}]} onPress={this.props.onPress}>
          <Text style={[style.buttonText,{opacity:this.props.opacity?this.props.opacity:1,color:css.dynamic.general.buttonText}]}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
