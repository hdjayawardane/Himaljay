import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const headerHeight=40;
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);
//The forgraound color on the progress indicator
const activeColor="#BD1C1D"; //#fe7013

exports.static=StyleSheet.create({
    "headerImage":{
      "height":180,
      "width":width,
    },
    "border":{
      "height":1,
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color:"black"
      
    },
    imageHolder:{
      flex:75,
       alignItems: 'center',
       justifyContent: 'center',
    },
    imageLogoHolder:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:40,
      marginBottom:20,
    },
    image:{
      width:200,
      height:200,
    },
    logo:{
      width:100,
      height:100,
    },
    loading:{
      flex:25,
       alignItems: 'center',
       justifyContent: 'center',
    },
    list: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    detailsScroll:{
      paddingVertical: 20,
      bottom:0,
      flex:1,
    },
    intemInfoLabel: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 4,
        marginRight: 8,
        color: '#333',
        fontWeight: '300',
    },
    paymentOptionsStyle:{
      height:100,
      justifyContent: "space-around",
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10
    },
    paymentOption: {
      flex:1,
      width:(width/2)-50,
      borderRadius: 4,
      borderColor: "#ddd",
      borderWidth: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "space-around",
      
      },
    paymentOptionImage: {
      height:50,
      width:100
    }
});

exports.layout=StyleSheet.create({
  containerFlexability:{
    flex:1
  },
  containerBackground:{
    backgroundColor:"rgba(0,0,0,0)"
  },
  commonContainerBottom:{
    marginBottom:120
  },
  categoryList:{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  scrollableTabViewStyle:{
    backgroundColor: '#fff'
  },
  stepIndicatorBackground:{
    backgroundColor:"#eeeeee"
  },
  cardHolder:{
    flex:10,
    paddingRight:10,
    paddingLeft:10
  },
  cartSubHolder:{
    height:60,
    flexDirection: 'row'
  },
  cardBackButtonHolder:{
    flex:2,
    paddingRight:10
  },
  orderCompletedStyleIcon:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    borderRadius:60,
    height:120,
    width:120,
    backgroundColor:"red"
  },
  orderCompletedStyleText:{
    marginTop:10,
    padding:20,
    alignItems:"center",
    flex:1
  },
  orderCounter:{
    marginLeft:10,
    flex: 1,
    flexDirection: 'row',
    marginRight:10
  },
  orderOption:{
    marginLeft:10,
    flex: 1,
    marginRight:10
  },
  createInfoStr1:{
    flex:1,
    flexDirection: 'row',
    paddingLeft:20,
    paddingRight:20
  },
  orderDisplaySubContainer:{
    flex:1,
    height:26,
    backgroundColor:"gray",
    borderRadius:13,
    justifyContent:"center"
  },
  orderDisplayContainer:{
    flex:1,
    margin:10
  },
  orderDisplayText:{
    color:"#ffffff",
    marginLeft:10,
    width:200
  },
  noItemsTextStyle:{
    justifyContent: 'center',
    textAlign:'center',
    marginTop:10,
    opacity:0.7,
    fontFamily: 'open-sans'
  },
  scrollableTabViewStyle:{
    padding: 0,
    margin: 0
  },
  tabLabelStyle:{
    flex:1,
    alignItems:"center"
  },
  tagViewStyle:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  infoBoxStyle:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:10,
    marginBottom:10,
    marginTop:10
  },
  mapOverlay:{
    position: 'absolute',
    left: 0,
    bottom: 10,
    width: width,
    height: 150,
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    height:550,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop:height-550>0?(height-550)/2:0,
  },
  orderDetailView:{
    flex: 1, 
    marginTop: 20, 
    marginLeft: 20, 
    marginRight: 20, 
    marginBottom: 0, 
    backgroundColor: "white", 
    flexDirection: 'column'
  },
  orderName:{
    marginTop: 15, 
    marginLeft: 20, 
    fontSize: 18, 
    fontWeight: "600" 
  },
  orderContent:{
    flex: 1, 
    alignItems: 'center', 
    marginTop: 40, 
    marginBottom: 10, 
    flexDirection: 'column', 
    
  },
  orderUser:{
    textAlign: "center", 
    fontSize: 15, 
    color: "#8c8c8c", 
    fontWeight: "600"
  },
  qrImage:{
    width: 250, 
    height: 250, 
    marginTop: 30
  },
  orderID:{
    alignItems: 'center', 
    marginTop: 30, 
    textAlign: "center"
  },
  shareOrderButton:{
    flex: 1,
    marginTop: 5,
    marginLeft:20,
    marginRight:20
  }
})

exports.dynamic={}
