import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,ScrollView, UIManager, LayoutAnimation} from "react-native";
import style from "./style";
import css from '@styles/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Components } from 'expo';

import fun from '@functions/common'
import SingleImage from './SingleImage'

export default class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup:this.props.display,
      rtl:css.dynamic.general.isRTL
    }
  }

  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental)
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }



  render() {
      const rtlText = this.state.rtl && { textAlign: 'right', writingDirection: 'rtl' };
      const rtlView = this.state.rtl && { flexDirection: 'row-reverse' };
    return (
      <View style={[{marginTop:15,marginLeft:10,marginRight:10},rtlText]}>
        <Text style={[{textAlign: 'left', color:'#333',fontSize:20, fontWeight:"bold", marginBottom:5,fontFamily: 'open-sans'},rtlText]}>{this.props.title}</Text>
        <Text style={rtlText}>{this.props.text}</Text>
      </View>
    );
  }
}
