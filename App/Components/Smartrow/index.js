'use strict';

import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import style from "./style";
import css from '@styles/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StandardRow from '@smartrow/StandardRow'
import Tiles from '@smartrow/Tiles'
import List from '@smartrow/List'
import Notification from '@smartrow/NotificationsList'
import OrderList from '@smartrow/OrderList'

export default class SmartRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display:this.props.display,
      item:this.props.item,
      isListing:this.props.isListing,
      isRead:this.props.isRead
    }

    this.getExpectedValue=this.getExpectedValue.bind(this);
    this.getExpectedKey=this.getExpectedKey.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.startTime !== this.state.startTime) {
      this.setState({ startTime: nextProps.startTime });
    }else{
      this.setState({display:nextProps.display,isRead:this.props.isRead})
    }
  }

  getExpectedKey(forField){
    
    var setup=!this.state.isListing?this.state.display.categorySetup:this.state.display.listingSetup;
    return setup.fields[forField];
  }

  getExpectedValue(forField){
    if(this.state.item[this.getExpectedKey(forField)]){
      return this.state.item[this.getExpectedKey(forField)];
    }else{
      
      return "";
    }
  }

  render() {
    var styleOfDisplay=!this.state.isListing?this.state.display.categorySetup.category_style:this.state.display.listingSetup.listing_style;
    var display=!this.state.isListing?this.state.display.categorySetup:this.state.display.listingSetup;
    //alert(JSON.stringify(display))
    display.grid_with_space=true;
    if(styleOfDisplay=="grid1"){
      display.grid_rows=1;
      return (
        <Tiles  description={this.getExpectedValue("description")} title={this.getExpectedValue("title")} image={this.getExpectedValue("image")}  display={display} />
      );
    } if(styleOfDisplay=="grid2"){
      display.grid_rows=2;
      return (
        <Tiles  description={this.getExpectedValue("description")} title={this.getExpectedValue("title")} image={this.getExpectedValue("image")}  display={display} />
      );
    }if(styleOfDisplay=="list"){
      console.log("READING "+this.state.display.listingSetup.fields['subtitleFunctions']);
      return (
        <List
          displayItems={this.state.display}
          subtitle={this.getExpectedValue("subtitle")}
          subtitleFunctions={this.getExpectedKey("subtitleFunctions")}
          description={this.getExpectedValue("description")}
          title={this.getExpectedValue("title")}
          image={this.getExpectedValue("image")}
          display={display}
          {...this.props}/>
      );
    }if(styleOfDisplay=="notification"){
      return(
        <Notification
          displayItems={this.state.display}
          subtitle={this.getExpectedValue("subtitle")}
          subtitleFunctions={this.getExpectedKey("subtitleFunctions")}
          description={this.getExpectedValue("description")}
          title={this.getExpectedValue("title")}
          image={this.getExpectedValue("image")}
          display={display}
          isRead={this.state.isRead}
          {...this.props}/>
      );
    }if(styleOfDisplay=="orderList"){
      return(
        <OrderList
          displayItems={this.state.display}
          subtitle={this.getExpectedValue("subtitle")}
          subtitleFunctions={this.getExpectedKey("subtitleFunctions")}
          description={this.getExpectedValue("description")}
          title={this.getExpectedValue("title")}
          image={this.getExpectedValue("image")}
          display={display}
          {...this.props}/>
      );
    }else {
      return (
        <StandardRow title={this.getExpectedValue("title")} image={this.getExpectedValue("image")} />
      );
    }

  }
}
