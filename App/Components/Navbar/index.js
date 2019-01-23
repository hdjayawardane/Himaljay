'use strict';

import React, {Component,PropTypes} from "react";
import {Text, View, TouchableOpacity, Image,StatusBar} from "react-native";
import navBarStyle from "./style";
import css from '@styles/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
var to = require('to-case')

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const self = this
    const renderLeftbutton=function(){
      if(!self.props.isRoot){
        //Back button
        return (
          <View><MaterialIcons name={"keyboard-arrow-left"} size={24} style={{ color: css.dynamic.navBar.tintColor }} /></View>
        )
      }else{
        if(css.dynamic.general&&css.dynamic.general.layout&&css.dynamic.general.layout=="tabs"){
          //Tabs, do nothing
          return <View style={{width:24}}></View>
        }else{
          //Side menu, show hamburger
          //Home button
          return (<View><MaterialIcons name={"sort"} size={24} style={{ color: css.dynamic.navBar.tintColor }} /></View>)
        }
       
      }
    }


    const renderRightbutton=function(){
      if(!self.props.showRightButton){
        //Back button
        return (
          <View></View>
        )
      }else{
        //Dashboard button
        return (<View><MaterialIcons name={to.slug(self.props.rightButton).replace("md-","")} size={24} style={{ color: css.dynamic.navBar.tintColor }} /></View>)
      }

    }

    /*
       <StatusBar barStyle={css.dynamic.navBar.barStyle} />
        <View>
          <View style={[navBarStyle.statusBar,{backgroundColor:css.dynamic.navBar.statusBarBackgroundColor}]}>
          </View>
        </View>
    */

    return (
      <View>
        <View>
          <View style={[navBarStyle.container,{backgroundColor:css.dynamic.navBar.backgroundColor}]}>
            <TouchableOpacity  onPress={()=>{!this.props.isRoot?this.props.navigation.goBack(null):this.props.navigation.navigate('DrawerOpen')}}>
              <View style={navBarStyle.leftArea}>
                {renderLeftbutton()}
              </View>
            </TouchableOpacity>
            <View style={navBarStyle.centerArea}>
              <Image style={navBarStyle.navLogo} source={require('@images/navlogo.png')} />
            </View>
            <TouchableOpacity  onPress={this.props.rightAction}>
              <View style={navBarStyle.rightArea}>
                {renderRightbutton()}
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <View style={[navBarStyle.border,{backgroundColor:css.dynamic.navBar.borderColor}]} ></View>
      </View>

    );
  }
}
