import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,ScrollView} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:props.checked
    }
  }


  render() {
    console.log("Alll ing");
    console.log(this.props.items);
    return (
      <TouchableOpacity onPress={()=>{this.setState({checked:!this.state.checked})}}>
        <MaterialIcons size={20} name={this.state.checked?"check-box":"check-box-outline-blank"} />
      </TouchableOpacity>
    );
  }
}

