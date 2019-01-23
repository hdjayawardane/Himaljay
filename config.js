//FireBase  --- CHANGE THEM WITH YOUR OWN FIREBASE DB
exports.firebaseConfig = {
  apiKey: "AIzaSyCH6wmL18AbDqCIXNsGBGINxzUnlPkB3bs",
  authDomain: "universalapp-a272a.firebaseapp.com",
  databaseURL: "https://universalapp-a272a.firebaseio.com",
  projectId: "universalapp-a272a",
  storageBucket: "universalapp-a272a.appspot.com",
  messagingSenderId: "35001014547"
};


exports.paypal={
  acceptPayments:true, // Set this to false if you don't want to accept paypal payments
  sandBoxMode:true,
  clientID:"Af_H2HSMUFkVQsDfIggWgobv-QK59pLOR6iX77TpEWLUN8ob0eBGCg48CBX1gcifFKUdu0YHRfyS6Tnl",
  secretKey:"EHrmFLREuoQ7FMIEITEKckqydqhtQan07pIy0Uhc1TnNmmE33_xWfqlFoBXHg7gjuismQQaNoSzMLWIS",
  return_url:"https://envato.com/#products", //Replace it with your own webpage thank-you site
  cancel_url:"https://market.envato.com/", //Replace it with your own webpage cancel url
  includeShippingInfo:true,
  currency:"USD",
  state:"CA",//Checkc PayPalPayment.js in components to see how it is used, If it is not static, allow user to enter it in submit screen
  country_code:"US", //Country code must be 2-character ISO 3166-1 value (upper case)
  postal_code: "95131", //Required postal code - If it is not static, allow user to enter it in submit screen
  city: "San Jose", //Required city - If it is not static, allow user to enter it in submit screen
}


exports.sendEmailWhenOrderPlacer=true;

//ADS IDs
// -------- Do you want ads to be shown ------ //
exports.showBannerAds = false;
exports.showinterstitialAds = false;

// -------- Enter your adMob ids here ------- //
exports.bannerID = "";
exports.interstitialID = "";


//The Sendgrid KEY   --- CHANGE THEM WITH YOUR OWN SENDGRID
exports.SENDGRID_API_KEY="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";

//Orders are sent to --- CHANGE IT WITH YOUR OWN EMAIL
exports.sendToEmail="contact@mobidonia.com" //YOU CAN USE SMOOCH.IO email here

exports.firebaseMetaPath="/meta";
exports.isPreview=false;
