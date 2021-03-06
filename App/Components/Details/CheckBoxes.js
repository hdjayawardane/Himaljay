import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,ScrollView} from "react-native";
import style from "./style";
import css from '@styles/global'
import { Components } from 'expo';

import fun from '@functions/common'
import { Button } from 'react-native-elements';
import CheckBox from '@detailcomponents/CheckBox';


export default class CheckBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  createSingleCheckBox(name){
    return (
      <View style={{marginTop:2,marginLeft:10, marginRight:10,flexDirection:"row",alignItems:"center"}}>
        
          <CheckBox checked={false} />
          <Text style={[{textAlign: 'left', color:'#333',fontSize:15, margin:5,flex:1,flexDirection:"column"}]}>{name}</Text>

      </View>)
  }

  createSinglePart(section){
    return (
      <View style={{marginTop:5,marginLeft:10, marginRight:10}}>
        <Text style={[{textAlign: 'left', color:'#333',fontSize:15, fontWeight:"bold", marginBottom:5}]}>{section.name}</Text>
        {section.list.map((element)=>{
          return this.createSingleCheckBox(element);
        })}
      </View>)
  }


  render() {
    console.log("Alll ing");
    console.log(this.props.items);
    return (
      <View style={{marginTop:15,marginLeft:10, marginRight:10}}>
        <Text style={[{textAlign: 'left', color:'#333',fontSize:20, fontWeight:"bold", marginBottom:5,fontFamily: 'open-sans'}]}>{this.props.title}</Text>
        <View style={{backgroundColor:"#dddddd",padding:5}}>
          {this.props.items.map((item)=>{
             return this.createSinglePart(item);
          })}
        </View>
      </View>
    );
  }
}

