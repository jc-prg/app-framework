//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------
// main functions to load the app
//--------------------------------------
/* INDEX:
function appPrintMenu()
function appPrintStatus_load()
function appPrintStatus(data)
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

var mboxApp = new jcApp("mbox", RESTurl, "status", "api/");	// cmd: <device>/<cmd>
mboxApp.init("data_log", "error_log", reloadInterval, appPrintStatus );
mboxApp.timeout = -1; 							// timeout in milliseconds (-1 for no timeout)
mboxApp.load();
mboxApp.requestAPI_init();
mboxApp.setAutoupdate( app_check_status );

//--------------------------------
// additional apps to write menus, remotes, messages
//--------------------------------

var appMenu     = new appMenuDefinition("appMenu", ["menuItems","menuItems2"], "navTitle" );
var appMsg      = new jcMsg(      	"appMsg" );
//var appCookie   = new jcCookie(         "appCookie");
var reload      = true;


// ----------------- => fct. for testing <= ------------------


appCheckUpdates();		// check if app is up-to-date
appPrintStatus_load();		// initial load of data (default: Album)


//--------------------------------

function appClickMenu() {
        clickMenu();
        app_click_menu();
	}
	
//--------------------------------

function appPrintMenu() {

	appMenu.empty();
		
        for (let key in app_menu) {
        
        	if (app_menu[key][0] == "LINE") { 
        		appMenu.add_line();
        		}
        	else {
        		description = app_menu[key][0];
        		type        = app_menu[key][1];
        		link        = app_menu[key][2];
        		if (type == "script")    { appMenu.add_script( link, description ); }
        		else if (type == "link") { appMenu.add_link(   link, description ); }
        		}
        	}

        appMenu.set_title( appTitle );
        appMenu.menu_height();
	}


//--------------------------------
// print after loading data (callback)
//--------------------------------

function appPrintStatus_load() { reload=true; mboxApp.requestAPI('GET',["status"],"",appPrintStatus,"","appPrintStatus_load"); }
function appPrintStatus(data) {

	// print menu
	appPrintMenu();

/*
	// initial app data ...
	setTextById("remote3",  appTitle + " (" + data["API"]["name"] + ": " + data["API"]["version"] + " / " + 
				data["STATUS"]["active_device"] + ") " + detected_card );


	// write icon menu and lists
	if (reload) {

		// write icons for 3 modes
		mboxControlGroups();
		
		// wriete volume slider (default = hidden)
		mboxSlider.init(data);

		// write menu entrie for 3 modes
		if (mbox_mode == "Album")    { mboxAlbumAll_load(); }
		if (mbox_mode == "Playlist") { mboxPlaylistAll_load(); }
		if (mbox_mode == "Radio")    { mboxStream_load(); }

		reload = false;
		}

	// set info and control for playback
	mboxControl(data);
	mboxControlCheckLoading(data);
*/
	}

//--------------------------------
// send add commands
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
        mboxApp.requestAPI("GET",["version", appVersion], "", appCheckUpdates_msg, "wait");
        }
	
//-----------------------------
// EOF

