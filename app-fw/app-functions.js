//--------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------
/* INDEX:
function checkTheme()
function showRemoteInBackground(show=false)
function setNavTitle (title)
function image(file)
function writeKeyBoard ()
*/
//--------------------------------

//--------------------------------------
// check theme (if dark scheme)
//--------------------------------------

function checkTheme() {
	old_theme	= appTheme;
	element	= document.getElementById("theme_check");
	style		= window.getComputedStyle(element)["background-color"];
	
	if (style == "rgb(255, 255, 255)")	{ appTheme = "default"; }
	else					{ appTheme = "dark"; }
	if (old_theme != appTheme)		{ console.log("Change theme to: "+appTheme); app_theme_changed(theme=appTheme)}
	}

//--------------------------------
// create menus & landing page & setting page
//--------------------------------

function showRemoteInBackground(show=false) {
    var body   = document.getElementById("app_background");
    var width  = window.innerWidth;

    if (show == 1 || show == true) {
        body.style.backgroundImage      = "url("+rm3background+")";
        body.style.backgroundRepeat     = "no-repeat";
        body.style.backgroundPosition   = "bottom center";
        body.style.backgroundAttachment = "fixed";
        if (width < 350)	{ body.style.backgroundSize     = "100%"; }
        else 			{ body.style.backgroundSize     = "350px"; }
        }
    else {
        body.style.backgroundImage    = "";
        }
    }


//--------------------------------------
// Show / hide menu and set app title
//--------------------------------------


function setNavTitle (title) {
        setTextById("navTitle", "<div onClick=\"javascript:rm3settings.hide();rm3cookie.erase('remote');remoteInit();\">"+title.replace(/#/g,"\"")+"</div>");
        }

// ------------------------------------------

function image(file) {
        return "<img src='icon/"+file+"' style='max-height:18px;max-width:24px;margin:0px;padding:0px;' alt='"+file+"' />";
        }

//--------------------------------------

function writeKeyBoard () {
   var test = "<ul>";
   for (var i=8500;i<15000;i++) {
       test = test + "<li>" + i + " &nbsp; [ &#"+i+"; ]</li>";
       }
   test = test + "</ul>";
   return test;
   }

