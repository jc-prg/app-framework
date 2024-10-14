//--------------------------------
// class to configure and organize settings
//--------------------------------

function appSettingsDefinition(name) {

    this.data               = {};
	this.active             = false;
	this.app_name           = name;
	this.frame_setting_menu = "setting_header";
    this.frames_settings    = [];
    this.frames_content     = [];
    this.setting_entries    = {};
    this.setting_icon_dir   = "img/";
    this.setting_icon_end   = ".png";

    this.logging            = new jcLogging(this.app_name+".logging");
    this.tab                = new jcTable(this.app_name+".table");
    this.tab.table_width    = "";
    this.tab.table_border   = "0";

    // initialize class
    this.init = function () {

        }

    // create and show settings start page and/or menu
    this.create = function (selected_entry="") {

        if (selected_entry == "") {
            this.overview();
            this.show_settings(false);
            }
        else {
            if (selected_entry == "DEMO:INFO")      { this.default_entry_info(); }
            else if (selected_entry == "DEMO:DEMO") { this.default_entry_demo(); }
            else                                    {}

            setTextById(this.frames_settings[0], this.index(true, selected_entry) );
            this.show_settings(true);
            }
        }

    // show overview
    this.overview = function () {
        setTextById(this.frames_settings[0], "");
        setTextById(this.frames_settings[1], this.index() );
        for (var i=2; i<this.frames_settings.length; i++) { setTextById(this.frames_settings[i], "" ); }
        }

    // show index views (overview or header)
    this.index = function (header=false, selected="") {
        var html = "";

        if (header) {
            html += "<div class='setting_bg_inside' style='margin:auto;'>";
            html += "<button class='settings_button_index header' onclick=\""+this.app_name+".create();\">"+this.index_image(true, "menu")+"</button>";
	        }

        for (var key in this.setting_entries) {
	        var css_select = "";
	        var css_class  = "";
	        var image      = this.index_image(header, this.setting_entries[key][0]);
	        var text       = this.index_text(header, key);
	        var link       = this.setting_entries[key][1];

            if (key == selected)    { css_select = " selected"; }
            if (header)             { css_class  = " header"; }

            html += "<button class='settings_button_index"+css_class+css_select+"' onclick=\""+link+"\">"+image+text+"</button>";
	        }
        if (header) {
            html += "</div>";
            }
        return html;
        }

    // prepare image for index
    this.index_image = function (header, image) {
        if (image.indexOf("/") == -1)   { image = this.setting_icon_dir + image; }
        if (image.indexOf(".") == -1)   { image = image + this.setting_icon_end; }
        if (header)     { return "<img class='settings_icon_small' src='"+image+"' />"; }
        else            { return "<img class='settings_icon_big' src='"+image+"' />"; }
        }

    // prepare description for index
    this.index_text = function (header, text) {
        if (!header)     { return "<br/>&nbsp;<br/>" + lang(text); }
        else             { return ""; }
        }

    // show settings frames and hide content frames
    this.show_content = function () {
        this.active = false;
        for (var i=0; i<this.frames_content.length; i++)  { elementVisible(this.frames_content[i]);  }
        for (var i=0; i<this.frames_settings.length; i++) { elementHidden(this.frames_settings[i]); }
        }

    // show settings frames and hide content frames
    this.show_settings = function (show_header=true) {
        this.active = true;
        for (var i=0; i<this.frames_content.length; i++)  { elementHidden(this.frames_content[i]);  }
        for (var i=0; i<this.frames_settings.length; i++) { elementVisible(this.frames_settings[i]); }
        if (!show_header) { elementHidden(this.frames_settings[0]); }
        }

    // hide settings frames
    this.hide_settings = function () {
        this.active = true;
        for (var i=0; i<this.frames_settings.length; i++) { elementHidden(this.frames_settings[i]); }
        }

    // create demo entries
    this.default_entries = function () {
        this.add_entry("INFO", "info", this.app_name+".create('DEMO:INFO');");
        this.add_entry("DEMO", "demo", this.app_name+".create('DEMO:DEMO');");
        this.add_entry("QUESTION", "question", "appMsg.alert('Not implemented.');");
        }

    // create demo entry - server and app information
    this.default_entry_info = function () {
        var html = "";
        this.clear_frames();

        html += this.tab.start();
		html += this.tab.row(["Client:",	 appVersion]);
		html += this.tab.row(["Modules:",
                                            "jcMsg "        + appMsg.appVersion + "<br/>" +
                                            "jcApp "     + appFW.appVersion + " / jcAppFW "   + appFwVersion + "<br/>" +
                                            "jcCookies " + appCookie.appVersion + "<br/>" +
                                            "jcFunction "+ jc_functions_version]);
        html += this.tab.row_one("<hr/>");
        html += this.tab.row(["Scroll position:", "<text id='scrollPosition'>0px</text>"]);
        html += this.tab.row(["Window width:",    "<text id='windowWidth'>please wait</text>"]);
        html += this.tab.row(["Device width:",    "<text id='screenWidth'>please wait</text>"]);
        html += this.tab.row_one("<hr/>");
        html += this.tab.row(["Device type:",     print_display_definition()]);
        html += this.tab.end();

		html +="<br/>&nbsp;";

        this.write(1, "Information", html);
        appForceReload(false);

        }

    // create demo entry - server and app information
    this.default_entry_demo = function () {
        var html = "";
        html += "<center>" + lang("NOT_IMPLEMENTED") + "</center>";
        this.clear_frames();
        this.write(1, "Demo", html);
        }

    // add entry for settings (content to be defined somewhere else)
    this.add_entry = function (title, icon, call_function) {

        this.setting_entries[title] = [icon, call_function];
        }

    // clear all setting frames
    this.clear_frames = function () {

        for (var i=0; i<this.frames_settings.length; i++) { setTextById(this.frames_settings[i], ""); }
        }

    // remove all entries from settings definition
    this.remove_all_entries = function () {

        this.setting_entries    = {};
        }

    // write settings
	this.write = function (nr, label="", text="") {

        var content = "";
		var element = this.frames_settings[nr];
		if (label != "")        {
			content += "<font class='setting_headline'><center><b>" + label + "</b></center></font>";
            content += "<hr class='setting_line' />";
            content += text;
            content += "<br/>";
			}
		else if (text != "")    { content = text; }

		setTextById(element, content);
		}
    }

app_framework_loaded += 1;