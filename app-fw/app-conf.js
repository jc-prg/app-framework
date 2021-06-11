//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------
// app configuration
//--------------------------------------


// REST API configuration

var appFwVersion   = "v0.8.4";
var appVersion     = appFwVersion;
var appTitle       = "jc://app-framework/";
var appApiDir      = "api/";
var appApiStatus   = "status";
var appTheme       = "default";

if (app_title      != "") { appTitle     = app_title; }
if (app_version    != "") { appVersion   = app_version; }
if (app_api_dir    != "") { appApiDir    = app_api_dir; }
if (app_api_status != "") { appApiStatus = app_api_status; }

console.log(appTitle + appVersion);

var RESTurl        = "";
var RESTurl_noport = "";
var RESTip         = location.host;
var RESTprotocol   = location.protocol;
var ip             = RESTip.split(":");

if (ip[0] != "" && server_port != "") {
	RESTurl        = RESTprotocol+"//"+ip[0]+":"+server_port+"/";
	RESTurl_noport = RESTprotocol+"//"+ip[0];
	}
else if (ip[0] != "") {
	RESTurl        = RESTprotocol+"//"+location.host+"/";
	RESTurl_noport = RESTprotocol+"//"+ip[0];
	}
else if (server_port != "") {
	RESTurl        = "http://localhost:"+server_port+"/";
	RESTurl_noport = "http://localhost";
	server_port    = server_port;
	}
else {
	RESTurl        = "http://localhost:8000/";
	RESTurl_noport = "http://localhost";
	server_port    = "8000";
	}

console.log("API: " + RESTurl);

// presets

var dataAll          = {};
var dataConfig       = {};

var appUpdate        = false;
var eMsg             = false;

var reloadInterval   = 5;	// reload data every x seconds
var reload_active    = false;
var reload_waiting   = 0;

var loadingImage     = "modules/jc-msg/waiting.gif";
var colors         = [ "red", "green", "darkgreen", "blue", "darkblue" ];
var colors_dev     = [];

if (app_loading_image != "")   { loadingImage   = app_loading_image; }
if (app_reload_interval > 0)   { reloadInterval = app_reload_interval; }

var app_frames_sidebyside = false;

// Standard-Definition
//----------------------------------

var button_color  = {};
var button_img    = {};
var makro_def     = {};
var device_status = {};

// ------------------------------------------
// EOF


