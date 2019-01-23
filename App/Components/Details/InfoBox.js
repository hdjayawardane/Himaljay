import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,ScrollView, Dimensions } from "react-native";
import style from "./style";
import css from '@styles/global'
import { Components } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import fun from '@functions/common';

const {width, height, scale} = Dimensions.get("window")

export default class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup:this.props.display,
      iconName: this.props.iconName,
      descText: this.props.descText,
      color: this.props.color
    }
  }

render() {
const icon = (<Ionicons name={this.props.iconName} size={23} color={this.props.color} />)

    return (
      <View style= {[css.layout.infoBoxStyle,{justifyContent: 'initial'}]}>
      <View style={{marginRight:5}}>
          {icon}
      </View>
        <Text style={{color:this.props.color,fontSize: 16,fontFamily: 'open-sans'}}>{this.props.descText}</Text>
      </View>
    );
  }
}
