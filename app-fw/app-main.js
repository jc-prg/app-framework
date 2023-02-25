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

var appFW = new jcApp(appTitle, RESTurl, appApiStatus, appApiDir);				// cmd: <device>/<cmd>
appFW.init("data_log", "error_log", reloadInterval, appPrintStatus, appRequestStatus);
appFW.timeout = -1; 										// timeout in milliseconds (-1 for no timeout)
appFW.load();
appFW.requestAPI_init();
appFW.setAutoupdate();

//--------------------------------
// additional apps to write menus, remotes, messages
//--------------------------------

var appActivePage = "INDEX";
var appCookie     = new jcCookie("appCookie");
var appMenu       = new appMenuDefinition("appMenu", ["menuItems","menuItems2"], "navTitle" );

var appMsg        = new jcMsg("appMsg");

appMsg.set_waiting_image(image_url=loadingImage);

var appLastLoad   = 0;
var reload        = true;

// ----------------- => fct. for testing <= ------------------

appCheckUpdates();		// check if app is up-to-date
appPrepareFramework();         // initial load of framework
appPrintStatus_load();		// initial load of data (default: Album)

//--------------------------------
// enforce reload on mobiles when scrolling down -100px
//--------------------------------

window.addEventListener('scroll', function() { appForceReload(); });
window.onresize = function (event) { appMenu.menu_size(); app_screen_size_changed( width=window.innerWidth, height=window.innerHeight); }

//--------------------------------

function appPrepareFramework() {
	if (app_frame_count == undefined)   					{ app_frame_count   = 4; }
	if (app_frame_style == undefined || app_frame_style == ""	)	{ app_frame_style = "frame_column wide"; }
	if (app_setting_count == undefined)					{ app_setting_count = 4; }
	if (app_setting_style == undefined || app_setting_style == "")	{ app_setting_style = "setting_bg"; }
	
	html = "";
	for (i=1;i<=app_frame_count;i++) {
		html += "<div class='"+app_frame_style+"' id='frame"+i+"'></div>\n";
		}
	setTextById("frames", html)

	html = "";
	for (i=1;i<=app_setting_count;i++) {
		html += "<div class='"+app_setting_style+"' id='setting"+i+"' style='display:none'></div>\n";
		}
	setTextById("setting_frames", html)
	setTextById("setting"+app_setting_count,"\n<div id='error_log'></div>\n<div id='data_log' style='display:none'></div>\n");
	setTextById("reload_info", "<center><img src=\""+loadingImage+"\" style='width:50px;height:50px;'><div id='reload_msg'>&nbsp;</div></center>");
	}

//--------------------------------

function appClickMenu() {
	if (document.getElementById("menuItems").style.visibility == "hidden")     { document.getElementById("menuItems").style.visibility = "visible"; }
	else                                                                       { document.getElementById("menuItems").style.visibility = "hidden"; }
	app_click_menu();
	}
	
//--------------------------------

function appPrintMenu(data) {

	var app_menu = app_menu_entries(data);

	if (app_menu.length > 0) {
		console.debug("appPrintMenu: "+app_menu.length+" entrie(s)");
		appMenu.empty();
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
        else {
		console.debug("appPrintMenu: 0 entries / other menu funct. in use");
        	}
	}


//--------------------------------
// print after loading data (callback)
//--------------------------------

function appPrintStatus_load() {
    reload=true;
    appFW.requestAPI('GET',[appApiStatus],"",appPrintStatus,"","appPrintStatus_load");
    console.info("---> appPrintStatus_load: DONE");
    }

function appPrintStatus(data) {

	// check theme (default or dark)
	checkTheme();

	// internal status check - Status LED
	appStatusLoad(data);

	// external status check
	app_status(data);
	
	// initial load
	if (reload) {
		app_initialize(data);
		app_status(data);
		appMenu.init(data);
		reload = false;
		}
	
	// print menu
	appPrintMenu(data);
	}

//--------------------------------
// send add commands
//--------------------------------

function appStatusLastLoad() {
	var current_timestamp = Date.now();
	var difference        = (current_timestamp - appLastLoad) / 1000;
	if (difference > 20)		{
	    setTextById("statusLED","<div id='red'></div>");
	    app_connection_lost(error=true);
	    return "Waiting "+difference.toFixed(1)+"s (red)";
	    }
	else if (difference > 10)	{
	    setTextById("statusLED","<div id='yellow'></div>");
	    return "Waiting "+difference.toFixed(1)+"s (yellow)";
	    }
	else if (difference <= 10)	{
	    app_connection_lost(error=false);
	    setTextById("statusLED","<div id='green'></div>");
	    return "OK (green)";
	    }
	}

function appCheckTimeout() {
    if (appFW.error_timeout) {
        setTextById("statusLED","<div id='red'></div>");
        setTimeout(function(){setTextById("statusLED","<div id='yellow'></div>");},500);
        setTimeout(function(){setTextById("statusLED","<div id='red'></div>");},1000);
        setTimeout(function(){setTextById("statusLED","<div id='green'></div>");},1500);
    }
}

function appStatusLoad(data) {
	if (reload) {
	    setInterval(function(){
	        last_status = appStatusLastLoad();
	        var currentdate = new Date();
            var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            console.info("---> appStatusLoad: " + last_status + " ... " + datetime);
	        }, reloadInterval*1000);
	    }
	appLastLoad = Date.now();
	}

//--------------------------------

function appForceReload(without_position=false) {
	position = window.pageYOffset;
	
	if (document.getElementById('scrollPosition')) { setTextById('scrollPosition',position+" px"); }
	if ((without_position || position <= -80) && reload_active == false) { 
		reload_active  = true;
		reload_waiting = 0;
		elementVisible('reload_info');
		setTextById('reload_msg','.');
		window.setTimeout(function() { appFW.requestAPI( "GET", ["reload"], "", appForceReload_checkIfReady ); }, 1000);
		}   	
	}
	
function appForceReload_checkIfReady(data) {
	var reload_status = true;
	var timeout       = 15;
	
	if ("CONFIG" in data && "reload_status" in data["CONFIG"])	{ reload_status = data["CONFIG"]["reload_status"]; }
	else if ("STATUS" in data && "reload" in data["STATUS"])	{ reload_status = data["STATUS"]["reload"]; }
	
	if (reload_active && reload_status == false || reload_waiting >= timeout) {
	   	reload_active = false;			 	// activate reload again
	   	reload_waiting = 0;
		elementHidden('reload_info');			 // hide loading message
	   	app_force_reload(data);
		}
	else if (reload_active) {
		reload_waiting += 1;
		if (reload_waiting < 5)		{ addTextById('reload_msg','.'); }
		else if (reload_waiting < 10)		{ setTextById('reload_msg',lang("RELOAD_TAKES_LONGER")); }
		else if (reload_waiting < timeout)	{ setTextById('reload_msg',lang("RELOAD_TAKES_MUCH_LONGER")); }
		else					{ setTextById('reload_msg',lang("RELOAD_TIMED_OUT") + " <text onclick=\"elementHidden('reload_info');\" style='cursor:pointer'><u>" + lang("CLOSE") + "</u></text>"); }
		if (reload_waiting < timeout) {
			window.setTimeout(function() { appFW.requestAPI( "GET", [appApiStatus], "", appForceReload_checkIfReady ); }, 1000);
			}
		}	
	}

//--------------------------------

function appRequestStatus(status,commands,source) {
	
	loading   = document.getElementById("statusLEDload");
	statusLED = document.getElementById("statusLED");
	
	if (loading == undefined)		{ return; }
	if (statusLED == undefined)		{ return; }
	if (commands[0] == appApiStatus)	{ return; }

	console.debug("Request-Status: "+status+" / "+commands.join()+" ("+source+")");
	
	if (status == "START")		  { loading.style.display = "block"; }
	else if (status == "SUCCESS") { loading.style.display = "none"; }
	else if (status == "TIMEOUT") {
	    statusLED.innerHTML   = "<div id='red'></div>";
	    setTimeout(function(){ statusLED.innerHTML = "<div id='yellow'></div>"; },500);
	    setTimeout(function(){ statusLED.innerHTML = "<div id='red'></div>"; },1500);
	    setTimeout(function(){ statusLED.innerHTML = "<div id='yellow'></div>"; },2000);
	    setTimeout(function(){ statusLED.innerHTML = "<div id='red'></div>"; },2500);
	    setTimeout(function(){ statusLED.innerHTML = "<div id='yellow'></div>"; loading.style.display = "none"; },3000);
	}
	else if (status == "ERROR")	  { statusLED.innerHTML   = "<div id='red'></div>"; loading.style.display = "none"; }
	}

//--------------------------------

function appCheckUpdates_msg(data) {

	var msg; 
        if (!data) 					{ return; } 
        else if ("check-version" in data["STATUS"]) 	{ msg = data["STATUS"]["check-version"]; }
        else if ("REQUEST" in data)			{ msg = { "Code" : data["REQUEST"]["ReturnCode"], "Msg"  : data["REQUEST"]["Return"] }; }
        else 						{ return; }

        message = "<br/></b><i>"+msg["Msg"]+"</i>";
        appMsg.wait(lang("LOADING_APP")+" ..."+message, "");

        if (msg["Code"] == "800") { setTimeout(function(){appMsg.hide();},2000); }
        if (msg["Code"] == "801") { setTimeout(function(){appMsg.hide();},2000); }
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

