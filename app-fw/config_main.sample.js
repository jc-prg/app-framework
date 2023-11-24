//--------------------------------
// config menu and main functions
//--------------------------------

var app_frame_count       = 4;                     // amount of content frames
var app_frame_style       = "frame_column wide";   // css class for content frames (remove "wide" if you want to use floating boxes with a fixed width)
var app_frames_sidebyside = false;                 // if you remove "wide" in the row above, set this value to "true"
var app_setting_count     = 4;                     // amount of settings frames (idea: hide content frames / show settings frames)
var app_setting_style     = "setting_bg";          // css class for setting frames
var app_last_load         = 0;
var app_title             = ""; // add your app title (default defined in app-fw/app-conf.is)
var app_version           = ""; // add your app version (default defined in app-fw/app-conf.is)
var app_api_dir           = ""; // add your api dir (default defined in app-fw/app-conf.is)
var app_api_status        = ""; // add your api status command (default defined in app-fw/app-conf.is)
var app_loading_image     = ""; // add your loading image (default defined in app-fw/app-conf.is)
var app_reload_interval   = 0;  // add your reloading interval (default=5s)
var appAutoLoad           = false;

//--------------------------------
// create menu entries
//--------------------------------

function app_menu_entries() {
	// define the menu here
	// or set "app_menu = [];" if another menu functions should be used
	
	var app_menu = [
		[lang("INDEX"),        "link", "/index.html"],
		["Sources",            "link", "https://github.com/jc-prg/app-framework/"],
		/*
		add your menu entries here
		*/
		["LINE"],
		[lang("SETTINGS"),      "script", "appMsg.alert('"+lang('NOT_IMPLEMENTED')+"');" ],
		];
		
/*
	// add additional menu elements if a condition is fulfilled
	if (app_admin_allowed) {
		app_menu = app_menu.concat([
		["LINE"],
		[lang("CAMERAS"),       "script", "birdhousePrint_load('CAMERAS','"+app_active_cam+"');"],
		[lang("TODAY_COMPLETE"),"script", "birdhousePrint_load('TODAY_COMPLETE','"+app_active_cam+"');"],
		["LINE"],
		[lang("SETTINGS"),      "script", "appMsg.alert('"+lang('NOT_IMPLEMENTED')+"');" ],
		]);
		}
*/
	return app_menu;
	}

	
//--------------------------------
// function to request status, update menu etc. (including initial load)
//--------------------------------

function app_status(data) {
	if (reload) { 
		var text = "<center><h1>"+appTitle+"</h1><br/>"+lang("SAMPLE_APP")+"</br>";
		text += "(Scroll Position: <text id='scrollPosition' onclick='appForceReload(true);'>0px</text>)";
		text +="<br/>&nbsp;</center>";
		setNavTitle(appTitle);
		setTextById("frame2", text);
		reload = false;
		}
	}
	
//--------------------------------
// add code when forced a reload
//--------------------------------

function app_force_reload(data) {
	}
	
//--------------------------------
// add code for app specific initialization
//--------------------------------

function app_initialize() {
	}
	
//--------------------------------
// add code when menu icon is clicked
//--------------------------------

function app_click_menu() {
	}
	
//--------------------------------
// add code when theme changed
//--------------------------------

function app_theme_changed(theme) {
	}
	
//--------------------------------
// add code when screen size changed
//--------------------------------

function app_screen_size_changed(width, height) {
	console.log("Changed screen size to " + width + "x" + height);
	}

//--------------------------------

var app_connection_error = true;
function app_connection_lost(error=false) {
    if (app_connection_error != error) {
        if (error) {
            // code if lost connection
        }
        else {
            // code if got back connection
        }
    }
    app_connection_error = error;
}


//--------------------------------
//EOF
