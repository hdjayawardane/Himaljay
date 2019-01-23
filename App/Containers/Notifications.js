/*
  Created by Dimov Daniel
  Mobidonia
*/
import React, {Component} from "react";
import {View,TouchableOpacity,StyleSheet,ScrollView,AsyncStorage,FlatList,ActivityIndicator} from "react-native";
import Navbar from '@components/Navbar'
import firebase from '@datapoint/Firebase'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import css from '@styles/global'
import fun from '@functions/common'
import CartFunction from '@functions/cart'
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
import StepIndicator from '@components/StepIndicator';
import Smartrow from '@smartrow'
import PayPalPayment from "./PayPalPayment"
import { Text,FormLabel, FormInput, Button } from 'react-native-elements'
import Config from '../../config'
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import T from '@functions/translation'
import { Constants, WebBrowser } from 'expo';

const id = []
export default class Notifications extends Component {
  //The key extraxtor
  _keyExtractor = (item, index) => item.id+index;
  
  //The constructor
  constructor(props) {
    super(props);

    //Init state
    this.state = {
      items:[],
      animating: true,
      result: null

    }

    //Bind functions
    this.getNotifications=this.getNotifications.bind(this);
    this.renderItem=this.renderItem.bind(this);
    this.checkIfIDAlreadyExist=this.checkIfIDAlreadyExist.bind(this);
    this.checkReadStatus=this.checkReadStatus.bind(this);
    this.addReadedContent=this.addReadedContent.bind(this);
  
    
  }

  //Component mount function
  componentDidMount(){

    //Reference to this
    var _this=this;
    this.getNotifications()
  
  }

  async addReadedContent(object,property,callback){
    var _this=this;
    this.getReadedContent(property, async function(data,error){
      if(error==false){
        var items=data;
        if(object instanceof Array){
           object.forEach(element => {
           items.push(element);
         });
        }else{
          if(items.indexOf(object)==-1){
            items.push(object);
          }
        }
        console.log(JSON.stringify(items.length));
        
        try {
            await AsyncStorage.setItem('@MySuperStore:'+property, JSON.stringify(items),function(done){
              _this.getReadedContent(property,callback);
           });
         } catch (error) {
           // Error saving data
         }
      }
    })
 }

  async  getReadedContent(property,callback) {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:'+property);
      if (value !== null){
        // We have data!!
        console.log(value);
        callback(JSON.parse(value),false);
      }else{
        callback([],false);
      }
    } catch (error) {
      // Error retrieving data
      callback(error,true);
    }
  }


  async checkReadStatus(allNotifications,property,callback){
    this.getReadedContent(property,  function(readItems,error){
      for (let index = 0; index < allNotifications.length; index++) {
        allNotifications[index].isRead=readItems.indexOf(allNotifications[index].id)>-1?true:false;
      }
      callback(allNotifications,false);
    });
  }

  /**
  * renderItem - render single order in the FlatList
  * @param {Object} data data to display
  */
  renderItem(data){
    var item=data.item;
      var listingSetup={
        "fields": {
          "description": "message",
          "title": "title",
        },
        "listing_style": "notification"
      };

      return (
        <TouchableOpacity  onPress={()=>{this.openNotification(item)}}>
          <Smartrow
            min={0}
            isListing={true}
            isCart={false}
            isRead={item.isRead}
            item={item}
            id={item.id}
            key={item.id}
            display={{listingSetup:listingSetup}}
            />
        </TouchableOpacity>         
      )
    }


  checkIfIDAlreadyExist = (item) => {
    AsyncStorage.getItem(item, (err, result) => {
      
        if (result !== null) {
          console.log('Data Found', result);
          
        } else {
          console.log('Data Not Found');
          AsyncStorage.setItem(item, JSON.stringify(item));
          
        }
      });
    }
  
    async openNotification(item){
      var _this=this;
       this.addReadedContent(item.id,"readedNotification",async function(updatedIds,error){
       
        _this.checkReadStatus(_this.state.items,"readedNotification",function(alteredNotification,errorOccured){
         
          _this.setState({
            items:alteredNotification,
          })

          if(item.message.match(/^http?\:\//))
          {
            _this.handleOpenWebBrowser(item.message)
          }else{
            _this.openDetails(item.longMessage)
          }

        })

        
      
      })
    }
      

  handleOpenWebBrowser = async (item) => {
    let result = await WebBrowser.openBrowserAsync(item);
  };

  openDetails(item){
    console.log(item);
    this.props.navigation.navigate('NotificationDisplay',{data:item})
  }

  /**
  * getNotifications - Get the notifications
  *
  */
 getNotifications(){
    //Get the meta data
    var path="/notifications";

    var _this=this;
    console.log("Data point "+path);


    var db=firebase.firestore();
    var data = [];
    var ref=db.collection(path);
    
    ref.get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          var objToAdd=JSON.parse(doc._document.data.toString());
          objToAdd.id=doc.id;
          objToAdd.isRead=false;
          data.push(objToAdd);
        });

        _this.checkReadStatus(data,"readedNotification",function(alteredNotification,errorOccured){
          _this.setState({
            items:alteredNotification,
            animating:false
          })
        })
        

    });
  }

  /**
  * renderIf - render a text label if there is no items
  * @param {Object} numItems
  */
  renderIf(numItems){
    console.log("This is the number of data "+numItems)
    if(numItems == 0 && this.state.animating == false){
       return (
          <Text style={css.layout.noItemsTextStyle}>{T.no_notifications}</Text>
        )
    }
  }


  render() {
    return (
      <View style={[css.layout.containerBackground,{flex:1}]}>
          <Navbar navigation={this.props.navigation} isRoot={ true} showRightButton={false}  />
          {this.renderIf(this.state.items.length)}
          <FlatList
            data={this.state.items}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      )
  }

}