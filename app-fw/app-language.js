//--------------------------------------
// jc://music-box/, (c) Christoph Kloth
//--------------------------------------
// multi-language support (implementation just started)
//--------------------------------------
// language[LANG][<param>]
// lang(<param>);

var LANG     = "EN";
var language = {
	"DE" : {
		"ADD"			: "Hinzuf&uuml;gen",
		"CATEGORY"		: "Kategorie",
		"CLOSE"		: "Schlie&szlig;en",
		"DESCRIPTION"		: "Beschreibung",
		"DEVICE"		: "Gerät",
		"DEVICE_UNKNOWN"	: "Gerät unbekannt",
		"DISC_SPACE"		: "Speicherplatz",
		"EDIT"			: "Bearbeiten",
		"EMPTY_LIST"		: "Liste ist leer",
		"ERROR"		: "Fehler",
		"INDEX"		: "Index",
		"INFORMATION"		: "Informationen",
		"LIVESTREAM"		: "Live-Stream",
		"LOADING_APP"		: "Starte App",
		"LOADING_TIME"		: "Ladezeiten",
		"LOADING_DATA"		: "Lade Daten ...",
		"LOGO"			: "Logo",
		"NEW"			: "neu",
		"NOT_FOUND"		: "nicht gefunden",
		"NOT_IMPLEMENTED"	: "Noch nicht implementiert.",
		"PLEASE_WAIT"		: "Bitte warten",
		"RELOAD"		: "neu laden",
		"RELOAD_DATA"		: "Daten neu laden",
		"RELOAD_STARTED"	: "Reload gestartet",
		"RELOAD_TAKES_LONGER"	: "Reload dauert l&auml;nger als erwartet",
		"RELOAD_TAKES_MUCH_LONGER" : "Reload dauert deutlich l&auml;nger als erwartet",
		"RELOAD_TIMED_OUT"	: "Reload fehlgeschlagen",
		"SETTINGS"		: "Einstellungen",
		"SIZE"			: "Gr&ouml;&szlig;e",
		"STARTTIME"		: "Startzeit",
		"TITLE"		: "Titel",
		"TODAY"		: "Heute",
		"PLEASE_WAIT"		: "Bitte warten",
		"YESTERDAY"		: "Gestern",
		"WEBSITE"		: "Webseite",
		},
	"EN" : {
		"ADD"			: "Add",
		"CATEGORY"		: "Category",
		"CLOSE"		: "Close",
		"DESCRIPTION"		: "Description",
		"DEVICE"		: "Device",
		"DEVICE_UNKNOWN"	: "Device unknown",
		"DISC_SPACE"		: "Disc space",
		"EDIT"			: "Edit",
		"EMPTY_LIST"		: "List is empty",
		"ERROR"		: "Error",
		"HERE"			: "here",
		"INDEX"		: "Index",
		"INFORMATION"		: "Information",
		"LIVESTREAM"		: "Live stream",
		"LOADING_APP"		: "Loading App",
		"LOADING_TIME"		: "Loading Time",
		"LOADING_DATA"		: "Loading data ...",
		"LOGO"			: "Logo",
		"NEW"			: "new",
		"NOT_FOUND"		: "not found",
		"NOT_IMPLEMENTED"	: "Not yet implemented.",
		"PLEASE_WAIT"		: "Please wait",
		"RELOAD"		: "reload",
		"RELOAD_DATA"		: "Reload data",
		"RELOAD_STARTED"	: "Reload started",
		"RELOAD_TAKES_LONGER"	: "Reload takes longer than expected.",
		"RELOAD_TAKES_MUCH_LONGER" : "Reload takes much longer than expected.",
		"RELOAD_TIMED_OUT"	: "Reload timed out.",
		"SETTINGS"		: "Settings",
		"SIZE"			: "Size",
		"STARTTIME"		: "Start time",
		"STREAM"		: "Stream",
		"STREAMS"		: "Streams",
		"TITLE"		: "Title",
		"TODAY"		: "Today",
		"PLEASE_WAIT"		: "Please wait",
		"YESTERDAY"		: "Yesterday",
		"WEBSITE"		: "Website",
		}
	}


function lang( param ) {
        var error = "<font color='red'>Translation not found ("+param+")</font>";
	if (language[LANG][param])		{ return language[LANG][param]; }
        else if (language["EN"][param])	{ return language["EN"][param]; }
        else if (language["DE"][param])	{ return language["DE"][param]; }
        else if (language_app != undefined) {
		if (language_app[LANG][param])	{ return language_app[LANG][param]; }
	        else if (language_app["EN"][param])	{ return language_app["EN"][param]; }
	        else if (language_app["DE"][param])	{ return language_app["DE"][param]; }
		else					{ return error; }
        	}
	else { return error; }
	}
