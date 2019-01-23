import moment from 'moment';
import {Linking,Platform} from "react-native";

class FunctionDirectorty {
  roundOn(value,places=2) {
		return parseFloat(value+"").toFixed(parseInt(places));
	}

	toCurrency(value,code="USD"){
    var currencyFormatter = require('currency-formatter');
		return currencyFormatter.format(value, { code: code });
	}

	toReadableDate(value,format='LLLL'){
		return moment(value).format(format)
	}

	openGps(location){
		var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
		var url = scheme + '37.484847,-122.148386'
		this.openExternalApp(url)
	}

	openExternalApp(url) {
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log('Don\'t know how to open URI: ' + url);
			}
		});
	}


	append(value,string=""){
		return value+string;
	}

	prepend(value,string=""){
		return string+value;
	}

  multiply(value,by=1){
		return Number(value)*Number(by);
	}

  trim(value,length=10){
    return value.length > length ?
                    value.substring(0, length - 3) + "..." :
                    value;
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}

function callFunction(subject,actions) {
	console.log("Subject:"+subject);
	console.log("Functions:"+actions);
	var functions=actions.split(",");
	let functionIndexer  = new FunctionDirectorty();
	for (var i = 0; i < functions.length; i++) {
		var functionParts=functions[i].split("~");
		var functionName=functionParts[0];
		console.log(functionName+" with "+(functionParts.length-1)+" parameter");
		if(functionIndexer[functionName]!=undefined&&functionIndexer[functionName]!=null){
			if(functionParts.length==1){
				//Just name
				subject=functionIndexer[functionName](subject);
			}else if(functionParts.length==2){
				//1 parameter
				subject=functionIndexer[functionName](subject,functionParts[1]);
			}else if(functionParts.length==3){
				//2 parameters
				subject=functionIndexer[functionName](subject,functionParts[1],functionParts[2]);
			}
			else if(functionParts.length==3){
				//3 parameters
				subject=functionIndexer[functionName](subject,functionParts[1],functionParts[3]);
			}
		}else{
			console.log(functionName+" is not defined");
		}

	}
	return subject;

}
exports.callFunction=callFunction;
