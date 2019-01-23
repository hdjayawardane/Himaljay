import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,ScrollView} from "react-native";
import style from "./style";
import css from '@styles/global'
import { Components } from 'expo';
import { Badge } from 'react-native-elements';

import fun from '@functions/common'
import { Button } from 'react-native-elements';



export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagText: this.props.tagText,
      bgColor: this.props.bgColor
    }
  }

  render() {

    return (
      <View style={{marginLeft:10, marginBottom: 10}}>
        <Badge containerStyle={{ backgroundColor: this.props.bgColor,flex:1}}>
          <Text style={{color: 'white'}}>{this.props.tagText}</Text>
        </Badge>

      </View>
    );
  }
}
