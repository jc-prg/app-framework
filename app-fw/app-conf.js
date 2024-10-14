//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------
// app configuration
//--------------------------------------

// REST API configuration

var appFwVersion   = "v0.8.9";
var appVersion     = appFwVersion;
var appTitle       = "jc://app-framework/";
var appApiDir      = "api/";
var appTheme       = "default";
var appAutoLoad    = true;
var appApiStatus   = "status";
var appApiStatusCommands = [appApiStatus];

var RESTurl        = undefined;
var RESTurl_noport = undefined;
var RESTip         = undefined;
var RESTprotocol   = undefined;
var ip             = undefined;

console.log(appTitle + appVersion);

function appInit() {

    if (typeof app_title !== 'undefined'      && app_title      != "") { appTitle     = app_title; }
    if (typeof app_version !== 'undefined'    && app_version    != "") { appVersion   = app_version; }
    if (typeof app_api_dir !== 'undefined'    && app_api_dir    != "") { appApiDir    = app_api_dir; }
    if (typeof app_api_status !== 'undefined' && app_api_status != "") { appApiStatus = app_api_status; }

    RESTurl        = "";
    RESTurl_noport = "";
    RESTip         = location.host;
    RESTprotocol   = location.protocol;

    if (RESTip.indexOf("[") >= 0) {
        ip = RESTip.split("]");
        ip = ip[0].split("[");
        ip = ["[" + ip[1] + "]"];
        }
    else {
        ip = RESTip.split(":");
        }

    if (ip[0] != "" && typeof server_port !== 'undefined' && server_port != "") {
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
}

setTimeout(function(){
    if (appAutoLoad) { appInit(); }
    },500);

// show screen size and type -> see style-main-iphone.css for iPhone sizes as example
display_definitions = {
    "default_display" :         { "name" : "Default Display", "size" : [] },
    "big_display" :             { "name" : "Big Display", "size" : [] },
    "iphone_xs_portrait" :      { "name" : "iPhone X/XS/11/12m/13m Portrait", "size" : [375, 812] },
    "iphone_xs_landscape" :     { "name" : "iPhone X/XS/11/12m/13m Landscape", "size" : [812, 375] },
    "iphone_se1_portrait" :     { "name" : "iPhone 5/SE1 Portrait", "size" : [320, 568] },
    "iphone_se1_landscape" :    { "name" : "iPhone 5/SE1 Landscape", "size" : [568, 320] },
    "iphone_se3_portrait" :     { "name" : "iPhone 6/7/8/SE2/SE3 Portrait", "size" : [375, 667] },
    "iphone_se3_landscape" :    { "name" : "iPhone 6/7/8/SE2/SE3 Landscape", "size" : [667, 375] },
    "iphone_16p_portrait" :     { "name" : "iPhone 16pro Portrait", "size" : [402, 874] },
    "iphone_16p_landscape" :    { "name" : "iPhone 16pro Landscape", "size" : [874, 402] },
    "ipad_portrait" :           { "name" : "iPad 7/8/9 Portrait", "size" : [810, 1080] },
    "ipad_landscape" :          { "name" : "iPad 7/8/9 Landscape", "size" : [1080, 810] },
    "ipad_air_portrait" :       { "name" : "iPad Air 4/5 Portrait", "size" : [820, 1180] },
    "ipad_air_landscape" :      { "name" : "iPad Air 4/5 Landscape", "size" : [1180, 820] },
}

function print_display_definition() {
    var format_info = "";
    for (key in display_definitions) {
        format_info += "<div id='"+key+"'>"+display_definitions[key]["name"]+" "+JSON.stringify(display_definitions[key]["size"])+"</div>";
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

if (typeof app_loading_image !== 'undefined' && app_loading_image != "") { loadingImage = app_loading_image; }

var app_frames_sidebyside = false;

// Standard-Definition
//----------------------------------

var button_color  = {};
var button_img    = {};
var macro_def     = {};
var device_status = {};


app_framework_loaded += 1;
