/*
  Created by Dimov Daniel
  Mobidonia
  daniel@mobidonia.com
*/
import React, {Component} from "react";
import {Button,Text,View,FlatList,TouchableOpacity,StyleSheet,Image,ActivityIndicator} from "react-native";
import Navbar from '@components/Navbar'
import firebase from '@datapoint/Firebase'
import css from '@styles/global'
import Smartrow from '@smartrow'
import Config from '../../config'
import {AdMobBanner,AdMobInterstitial,PublisherBanner,AdMobRewarded} from "expo";
import T from '@functions/translation'
import { SearchBar } from 'react-native-elements'
import Cart from '@functions/cart';
import AppEventEmitter from "@functions/emitter"


const ConditionalWrap = ({condition, wrap, children}) => condition ? wrap(children) : children;
const ConditionalDisplay = ({condition, children}) => condition ? children : <View></View>;



export default class Master extends Component {
  //Key extractor for the Flat list
  _keyExtractor = (item, index) => item.id;

  //The constructor
  constructor(props) {
    super(props);

    //Our props can be ditectly in the props.data or props.navigation.state.params
    //First time, data goes in properties,
    //Later it is passed in navigation state
    //Let's find out where they are
    var isDataInProps=props.navigation.state.params==null
    console.log("Props")
    console.log(isDataInProps?props.data:props.navigation.state.params)
    this.state = {
      title: props.data.name,
      pr:isDataInProps?props.data:props.navigation.state.params,
      items:[],
      itemsStore:[],
      animating: true,
      showSearch: false
    }

    //Bind Functions
    this.openCategories=this.openCategories.bind(this);
    this.getData=this.getData.bind(this);
    this.renderItem=this.renderItem.bind(this);
    this.showHideSearch=this.showHideSearch.bind(this);
    this.searchChange=this.searchChange.bind(this);
  }

  //Component Mount function
  componentDidMount() {
    if(this.state.pr.sectionType&&(this.state.pr.sectionType=="wish-list"||this.state.pr.sectionType=="collected-list")){
      //This is wish list, get data from properties
      AppEventEmitter.addListener('favorites.refresh', this.getFavoritesList.bind(this));
      AppEventEmitter.emit('favorites.refresh');
    }else{
      //Get the Firestore data, based on the data_point, regular
      this.getData(this.state.pr.listingSetup?this.state.pr.listingSetup.data_point:this.state.pr.data_point);
    }
  }



  /**
  * STEP 1 - getData - gets data from Firestore
  * @param {String} pathRoot - Firestore path
  */
  getData(pathRoot){

    //Get the meta data
    var path=pathRoot;
    console.log("Data point "+path);

    //Get reference to this
    var _this=this;

    //Get references to firestore
    var db=firebase.firestore();
    var ref=db.collection(path);

    //Will putt data here
    var data = [];

    //If we have id, add where conditions to on the query
    if(this.state.pr.id){
      //Filter by collections
      //In version 3.2.0, we have the key collection_key to let us know on what collection to query on
      var passedCollectionKey=this.state.pr.listingSetup?this.state.pr.listingSetup.collection_key:this.state.pr.collection_key;
      var collection_key=passedCollectionKey!=null&&passedCollectionKey.length>1?passedCollectionKey:"collection";
      console.log("-------- COLLECTION ------");
      console.log(collection_key);
      console.log(path+'_collection/'+this.state.pr.id);


      ref=ref.where(collection_key, '==', db.doc(path+'_collection/'+this.state.pr.id))
    }

    //Now get the data
    ref.get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          var objToAdd=JSON.parse(doc._document.data.toString());
          //Add the id, on each object, easier for referencing
          objToAdd.id=doc.id;
          var asString=JSON.stringify(objToAdd);
          asString=asString.replace(new RegExp('"', 'g'), '');
          asString=asString.replace(new RegExp('{', 'g'), '');
          asString=asString.replace(new RegExp('}', 'g'), '');
          objToAdd.fullTextSearch=asString.toLowerCase();
          data.push(objToAdd);

        });

        //After data is stored in data, update the state
        //This will re-render the screen
        _this.setState({
          items:data,
          itemsStore:data,
          animating: false
        })
    });
  }

  /**
  * openCategories - click on the categories button
  */
  openCategories(){
    var item=this.state.pr;
    this.props.navigation.navigate('MasterSUB', {name: item.name,isRoot:false,  data:item, subMenus:[]})
  }

  /**
  * openDetails - opens the details screen
  * @param {Object} item item to open
  */
  openDetails(item){
    console.log(item);
    this.props.navigation.navigate('Details',{data:item})
  }

  /**
  * renderItem - render a row
  * @param {Object} data
  */
  renderItem(data){
    //We have our real data in data.item since FlatList wraps the data
    var item=data.item;

    return (
      <TouchableOpacity  onPress={()=>{this.openDetails(item)}}>
        <Smartrow isListing={true} item={item} display={this.state.pr}>
        </Smartrow>
      </TouchableOpacity>
    )
  }

  /**
  * renderIf - render a text label if there is no items
  * @param {Object} numItems
  */
  renderIf(numItems){
    if(numItems == 0 && this.state.animating == false){
       return (
          <Text style={css.layout.noItemsTextStyle}>{T.no_items}</Text>
        )
    }
  }

  /**
   * showBanner - if showBannerAds is true
  */
  showBanner()
  {
    if(Config.showBannerAds == true)
    {
      return (
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={Config.bannerID}
          didFailToReceiveAdWithError={this.bannerError}
        />
      )
    }
  }

  /**
  * Showing and hiding the searh bar
  */
  showHideSearch(){
    if(this.state.showSearch){
      //Now when hidding, clear the text
      this.search.clearText();
      this.search.blur();
    }
    this.setState({showSearch:!this.state.showSearch});
  }

  fullTextSearch(item) {
    console.log("Search for "+this);
    var queryStrings=(this.toLowerCase()).split(" ");
    queryStrings= queryStrings.filter(String).filter(e=>{return e.length>2});

    var match=queryStrings.some(function(v) { return item.fullTextSearch.indexOf(v) >= 0; })
    return match;
  }

  /**
  * searchChange - on search
  * @param {String} e, the entered string
  */
  searchChange(e){
    console.log(e)
    if(e.length==0){
      //User has removed all the string, or it has
      console.log("Clear search");
      this.setState({items:this.state.itemsStore})
    }else if(e.length>2){
      //Do filter
      console.log("Do filter");
      var filtered=this.state.itemsStore.filter(this.fullTextSearch,e);
      this.setState({items:filtered})
    }
  }

  /**
  * getFavoritesList - gets list of favorites
  */
  getFavoritesList(){
    var _this=this;
    Cart.getFavoritesContent(this.state.pr.collectedListName||"favorites",function(data,error){
        if(error==false){
          _this.setState({
            items:data,
            itemsStore:data,
            animating:false
          })
         }
      })
  }

  render() {
    return (
      <View style={css.layout.containerBackground}>
        <Navbar
          navigation={this.props.navigation}
          isRoot={this.state.pr.isRoot?true:false}
          showRightButton={true}
          rightButton={"search"}
          rightAction={this.showHideSearch}
        />
        {this.showBanner()}
        <ConditionalDisplay condition={this.state.showSearch} >
          <SearchBar lightTheme placeholder={T.searchBarText} ref={search => this.search = search} onChangeText={this.searchChange}  />
        </ConditionalDisplay>


        <FlatList
          style={{marginBottom: 70 }}
          data={this.state.items}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
        />

        {this.renderIf(this.state.items.length)}

        <ActivityIndicator
                    animating={this.state.animating}
                    style={[{height: 80}]}
                    color={css.dynamic.general.buttonColor}
                    size="large"
                    hidesWhenStopped={true}
                    />


      </View>
    );
  }
}
