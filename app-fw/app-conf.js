//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------
// app configuration
//--------------------------------------


// REST API configuration

var appFwVersion   = "v0.8.5";
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

display_definitions = {
    "default_display" : { "name" : "Default Display", "size" : [] },
    "iphone_xs_portrait" : { "name" : "iPhone X/XS Portrait", "size" : [375, 812] },
    "iphone_xs_landscape" : { "name" : "iPhone X/XS Landscape", "size" : [812, 375] },
    "iphone_se2_portrait" : { "name" : "iPhone SE2 Portrait", "size" : [375, 667] },
    "iphone_se2_landscape" : { "name" : "iPhone SE2 Landscape", "size" : [667, 375] },
    "ipad_portrait" : { "name" : "iPad Portrait", "size" : [810, 1080] },
    "ipad_landscape" : { "name" : "iPad Landscape", "size" : [1080, 810] },
    "ipad_air_portrait" : { "name" : "iPad Air Portrait", "size" : [820, 1180] },
    "ipad_air_landscape" : { "name" : "iPad Air Landscape", "size" : [1180, 820] },
}

function print_display_definition() {
    var format_info = "";
    for (key in display_definitions) {
        format_info += "<font id='"+key+"'>"+display_definitions[key]["name"]+" "+JSON.stringify(display_definitions[key]["size"])+" </font>";
    }
    return format_info;
}

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

if (app_loading_image != "") { loadingImage = app_loading_image; }

var app_frames_sidebyside = false;

// Standard-Definition
//----------------------------------

var button_color  = {};
var button_img    = {};
var makro_def     = {};
var device_status = {};

// ------------------------------------------
// EOF


