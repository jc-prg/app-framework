//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------
// class for drop down menu
//--------------------------------------


function appMenuDefinition(name, menu, title) {

	this.menuItems          = menu;
	this.menuTitle          = title;
	this.app_name           = name;
	this.initial_load       = true;
	this.data               = {};
	this.window_switch_size = 860;
    this.logging            = new jcLogging(this.app_name);


    // load data with devices (deviceConfig["devices"])
	this.init 		= function(data=[]) {
        if (data["DATA"]) 	{ this.data = data; }
        else		    	{ return; }

            if (this.initial_load) {
                this.logging.log("Initialized new class 'jcMenu'.");
                this.initial_load = false;
                }
            else {
                this.logging.log("Reload data 'jcMenu'.");
                }

        this.empty();
        this.menu_size();
        this.menu_height();
        }

	// set menu height (column of menu for better floating of elements ...)
	this.menu_height	  = function() {
	
		if (app_frames_sidebyside) {}
		else {
	   		var page_height = 0;
   			var page_height_settings = 0;
   			for (var i=1;i<=app_setting_count;i++)  { page_height_settings += document.getElementById("setting"+i).offsetHeight; }
   			for (var i=1;i<=app_frame_count;i++)    { page_height += document.getElementById("frame"+i).offsetHeight; }
   			if (page_height_settings > page_height) { page_height = page_height_settings; }
			page_height += 100;
			if (page_height < window.innerHeight) { page_height = window.innerHeight; }
   			document.getElementById("remote_nav").style.height = page_height + "px";
   			}

		nav_id = "menuItems2";
   		document.getElementById(nav_id).style.maxHeight = "100px"; // window.innerHeight + "px"; // 
        var height = window.innerHeight; //pageHeight();
        height    -= 55;
        document.getElementById(nav_id).style.maxHeight = height+ "px"; // window.innerHeight + "px"; //
        }
        	
    // set menu height - scroll if screen is not heigh enough
    this.menu_size		= function() {
    var height = window.innerHeight - 70;
    var width  = window.innerWidth;

    document.getElementById("menuItems").style.maxHeight   = height + "px";
    document.getElementById("menuItems2").style.maxHeight  = height + "px";
    if (width > this.window_switch_size) {
            document.getElementById("menuItems").style.visibility = "hidden";
            }
        }

    // load data with devices (deviceConfig["devices"])
    this.empty 		= function() {
        this.writeMenu("");
        }

    // add links to scenes to drop down menu
    this.add_script 	= function(script,label) {

        var menu = this.readMenu();
        menu += this.entry_script(script,label);
        this.writeMenu(menu);
        }

    // add links to scenes to drop down menu
    this.add_line 		= function() {

        var menu = this.readMenu();
        menu += "<hr width=\"90%\" height=\"1px\" />";
        this.writeMenu(menu);
        }

    // add links to scenes to drop down menu
    this.add_link 		= function(link,label) {

        var menu = this.readMenu();
        menu += this.entry_link(link,label);
        this.writeMenu(menu);
        }

    // menu entries
    this.entry_link		= function (link,label) {
        return "<li><a href=\"" + link + "\" target=\"_blank\">" + label + "</a></li>";
        }

    this.entry_script 	= function (script,label) {
        return "<li><a onClick=\"javascript:" + script + ";clickMenu();appHtmlSetNavTitle('" + label + "');\">"+label+"</a></li>";
        }

    this.set_title 		= function(title) {
        title = "<div onClick=\"javascript:if(mbox_settings){mboxSettingsToggle();};appCookie.erase('appCookie');\">"+title+"</div>";
        setTextById(this.menuTitle,title);
        }

    // write data to menu
    this.writeMenu		= function(menutext) {
        if (typeof this.menuItems == "string") {
            setTextById(this.menuItems,menutext);
            }
        else if (typeof this.menuItems == "object") {
            for (var i=0; i<this.menuItems.length; i++) {
                setTextById(this.menuItems[i],menutext);
                }
            }
        }

    // read data from menu
    this.readMenu		= function() {
        if (typeof this.menuItems == "string") {
            return getTextById(this.menuItems);
            }
        else if (typeof this.menuItems == "object") {
            return getTextById(this.menuItems[0]);
            }
        }
	}

app_framework_loaded += 1;
