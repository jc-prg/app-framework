//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------
// main functions to load the app
//--------------------------------------
/* INDEX:
function appPrepareFramework()
function appClickMenu()
function appPrintMenu()
function appPrintStatus_load()
function appPrintStatus(data)
function appStatusLastLoad()
function appStatusLoad(data)
function appRequestStatus(status,commands,source)
function appCheckUpdates_msg(data)
function appCheckUpdates()
*/
//--------------------------------------


if (test == true) {
	appTitle 	+= "test/";
	connect2stage	= "Test";
	document.getElementById("navTitle").style.color="red";
	}
else {
	connect2stage	= "Prod";
	}


//--------------------------------
// app to load info and send cmd to IR device
//--------------------------------

var appFW = new jcApp("mbox", RESTurl, "status", "api/");	// cmd: <device>/<cmd>
appFW.init("data_log", "error_log", reloadInterval, appPrintStatus, appRequestStatus);
appFW.timeout = -1; 							// timeout in milliseconds (-1 for no timeout)
appFW.load();
appFW.requestAPI_init();
appFW.setAutoupdate( app_check_status );


//--------------------------------
// additional apps to write menus, remotes, messages
//--------------------------------

var appActivePage = "INDEX";
var appMenu       = new appMenuDefinition("appMenu", ["menuItems","menuItems2"], "navTitle" );
var appMsg        = new jcMsg("appMsg");
var appCookie     = new jcCookie("appCookie");

var appLastLoad   = 0;
var reload        = true;

// ----------------- => fct. for testing <= ------------------

appCheckUpdates();		// check if app is up-to-date
appPrepareFramework();         // initial load of framework
appPrintStatus_load();		// initial load of data (default: Album)


//--------------------------------

function appPrepareFramework() {
	if (app_frame_count == undefined)   { app_frame_count = 4; }
	if (app_setting_count == undefined) { app_setting_count = 4; }
	
	html = "";
	for (i=1;i<=app_frame_count;i++) {
		html += "<div class='frame_column wide' id='frame"+i+"'></div>\n";
		}
	setTextById("frames", html)

	html = "";
	for (i=1;i<=app_setting_count;i++) {
		html += "<div class='setting_bg' id='setting"+i+"' style='display:none'></div>\n";
		}
	setTextById("setting_frames", html)
	setTextById("setting"+app_setting_count,"\n<div id='error_log'></div>\n<div id='data_log' style='display:none'></div>\n");
	}

//--------------------------------

function appClickMenu() {
        clickMenu();
        app_click_menu();
	}
	
//--------------------------------

function appPrintMenu() {

	appMenu.empty();
	
	var app_menu = app_menu_entries();		
	for (i=0;i<app_menu.length;i++) {

		key = app_menu[i];
		if (key[0] == "LINE") { 
        		appMenu.add_line();
        		}
        	else {
        		description = key[0];
        		type        = key[1];
        		link        = key[2];
        		if (type == "script")    { appMenu.add_script( link, description ); }
        		else if (type == "link") { appMenu.add_link(   link, description ); }
        		}
        	}

        //appMenu.set_title( appTitle );
        appMenu.menu_height();
	}


//--------------------------------
// print after loading data (callback)
//--------------------------------

function appPrintStatus_load() { reload=true; appFW.requestAPI('GET',["status"],"",appPrintStatus,"","appPrintStatus_load"); }
function appPrintStatus(data) {

	// internal status check - Status LED
	appStatusLoad(data)

	// external status check
	app_status(data);
	
	// initial load
	if (reload) {
		app_initialize(data);
		app_status(data);
		reload = false;
		}
	
	// print menu
	appPrintMenu();
	}

//--------------------------------
// send add commands
//--------------------------------

function appStatusLastLoad() {
	var current_timestamp = Date.now();
	var difference        = (current_timestamp - appLastLoad) / 1000;
	if (difference > 20)		{ setTextById("statusLED","<div id='red'></div>"); }
	else if (difference > 10)	{ setTextById("statusLED","<div id='yellow'></div>"); }
	else if (difference <= 10)	{ setTextById("statusLED","<div id='green'></div>"); }
	}

	
function appStatusLoad(data) {
	if (reload) {
		setInterval(function(){ appStatusLastLoad(); }, reloadInterval * 1000);
		}
	appLastLoad = Date.now();
	}

	
function appRequestStatus(status,commands,source) {
	
	loading   = document.getElementById("statusLEDload");
	statusLED = document.getElementById("statusLED");
	
	if (loading == undefined)	{ return; }
	if (statusLED == undefined)	{ return; }
	if (commands[0] == "status")	{ return; }

	console.debug("Request-Status: "+status+" / "+commands.join()+" ("+source+")");
	
	if (status == "START")		{ loading.style.display = "block"; }
	else if (status == "SUCCESS")	{ loading.style.display = "none"; }
	else if (status == "ERROR")	{ statusLED.innerHTML   = "<div id='red'></div>"; loading.style.display = "none"; }
	}

//--------------------------------

function appCheckUpdates_msg(data) {

        if (!data || !data["STATUS"]["check-version"]) { return; } // unclear, why sometimes no data are returned ...
        
        var msg = data["STATUS"]["check-version"];
        message = "<br/></b><i>"+msg["Msg"]+"</i>";

        appMsg.wait(lang("LOADING_APP")+" ..."+message, "");

        if (msg["Code"] == "800") { setTimeout(function(){appMsg.hide();},3000); }
        if (msg["Code"] == "801") { setTimeout(function(){appMsg.hide();},3000); }
        if (msg["Code"] == "802") { appUpdate = true; }
        }

//--------------------------------

function appCheckUpdates() {
        console.log("Check version: "+appVersion);
        appMsg.wait(lang("LOADING_APP")+" ...", ""); 
        appFW.requestAPI("GET",["version", appVersion], "", appCheckUpdates_msg, "wait");
        }
	
//-----------------------------
// EOF

