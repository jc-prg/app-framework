//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------
// app configuration
//--------------------------------------


// REST API configuration

var appVersion     = "v0.8.0";
var appTitle       = "jc://app-framework/";

var RESTip         = location.host;
var RESTprotocol   = location.protocol;
var ip             = RESTip.split(":");

if (ip[0] != "" && server_port != "") {
	var RESTurl        = RESTprotocol+"://"+ip[0]+":"+server_port+"/";
	var RESTurl_noport = RESTprotocol+"://"+ip[0];
	}
else if (ip[0] != "") {
	var RESTurl        = RESTprotocol+"://"+location.host+"/";
	var RESTurl_noport = RESTprotocol+"://"+location.host;
	}
else {
	var RESTurl        = "http://localhost:8000/";
	var RESTurl_noport = "http://localhost";
	var server_port    = "8000";
	}

// presets

var dataAll	= {};
var dataConfig	= {};

var appUpdate        = false;
var eMsg             = false;
var reloadInterval   = 5;	// reload data every x seconds
var connect2stage    = "Prod";	// default stage to connect to (changed if rm3_test == true)

var showButtonTime   = 0.2;     // time to show LED when button pressed
var showButton       = false;   // default: show pressed button in headline
var deactivateButton = false;   // default: deactivate buttons if device is not ON

var colors         = [ "red", "green", "darkgreen", "blue", "darkblue" ];
var colors_dev     = [];

var show_error     = ""; // onClick=\"javascript:showErrorLog();\""; // not implemented any more
var status_green   = "<div id='green' "+show_error+"></div>";
var status_yellow  = "<div id='yellow' "+show_error+"></div>";
var status_gray    = "<div id='gray' "+show_error+"></div>";
var status_red     = "<div id='red' "+show_error+"></div>";

var status_mute    = "rec_mute"; // -> show in <nav-info id="audio2"> 	// changed based on server settings
var status_vol     = "rec_vol";  // -> show in <nav-info id="audio1"> 	// changed based on server settings
var status_vol_max = 74;         // -> calculate in percent		// changed based on server settings


// Standard-Definition
//----------------------------------

var button_color  = {};
var button_img    = {};
var makro_def     = {};
var device_status = {};

// ------------------------------------------
// EOF


