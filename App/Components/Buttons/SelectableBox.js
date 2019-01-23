'use strict';

import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import style from "./style";
import css from '@styles/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Components } from 'expo';
import fun from '@functions/common'

export default class SelectableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup:this.props.display,
      isSelected:props.isSelected
    }
    this.handleThePress=this.handleThePress.bind(this);
  }

  handleThePress(){
    this.setState({
      isSelected:!this.state.isSelected

    })
    this.props.onPress();
  }





  render() {
    var image=this.props.isPayPal?require('@images/paypal.png'):require('@images/delivery.png');
    return (
      <View  style={{flex:1}}>
        <TouchableOpacity
        style={[{backgroundColor:this.props.isSelected?css.layout.stepIndicatorBackground:"#fff"},
        css.static.paymentOption]}
          onPress={this.handleThePress}>
          <Image
            style={css.static.paymentOptionImage}
            source={image}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
