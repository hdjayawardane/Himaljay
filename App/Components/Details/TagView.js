import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,ScrollView} from "react-native";
import style from "./style";
import css from '@styles/global'
import { Components } from 'expo';
import { Badge } from 'react-native-elements';

import fun from '@functions/common'
import { Button } from 'react-native-elements';
import Tag from '@detailcomponents/Tag';



export default class TagView extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  createSingleTag(tag){
    console.log("The TAG is "+tag);
    return (

            <Tag
               bgColor={css.dynamic.general.buttonColor}
               tagText={tag}
            />

    )
  }

  render() {

    return (

      <View style={[css.layout.tagViewStyle,{justifyContent: "space-evenly"}]} >
      {this.props.tags.map((tag)=>{
         return this.createSingleTag(tag);
      })}
      </View>
    );
  }
}
