//--------------------------------
// config menu and main functions
//--------------------------------

var app_frame_count   = 4;
var app_setting_count = 4;
var app_title         = ""; // add your app title (default defined in app-fw/app-conf.is)
var app_api_dir       = ""; // add your api dir (default defined in app-fw/app-conf.is)
var app_api_status    = ""; // add your app title (default defined in app-fw/app-conf.is)

var app_menu = [
	[lang("INDEX"),        "link", "/index.html"],
/*
add your menu entries here
*/
	["LINE"],
	[lang("SETTINGS"),      "script", "appMsg.alert('"+lang('NOT_IMPLEMENTED')+"');" ],
	]
	
//--------------------------------
// function to request status, update menu etc. (including initial load)
//--------------------------------

function app_status(data) {
	if (reload) { birdhousePrint(data=data, active_page=appActivePage, camera=app_active_cam); reload = false; }
	}
	
//--------------------------------
// add code when checked the status
//--------------------------------

function app_check_status() {
	}
	
//--------------------------------
// add code when menu icon is clicked
//--------------------------------

function app_click_menu() {
	}
