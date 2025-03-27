//--------------------------------
// class to configure and organize settings
//--------------------------------

function appSettingsDefinition(name) {

    this.data               = {};
	this.active             = false;
	this.loaded_index       = false;
	this.app_name           = name;
	this.frame_setting_menu = "setting_header";
    this.frames_settings    = [];
    this.frames_content     = [];
    this.setting_entries    = {};
    this.setting_icon_dir   = "img/";
    this.icon_dir           = "";
    this.setting_icon_end   = ".png";
    this.setting_header_cnt = 2;

    this.logging            = new jcLogging(this.app_name+".logging");
    this.tab                = new jcTable(this.app_name+".table");
    this.tab.table_width    = "";
    this.tab.table_border   = "0";

    // create and show settings start page and/or menu
    this.create = function (selected_entry="") {

        if (selected_entry == "") {
            this.show(false);
            this.overview();
            }
        else if (this.setting_entries[selected_entry]) {
            // this.setting_entries[id] = [title, icon, call_function, show_header];
            this.show(true);

            var entry = this.setting_entries[selected_entry];
            eval(entry[2]);
            if (entry[3]) {
                var [index, index_empty] = this.index(true, selected_entry);
                setTextById("setting_header", index);
                setTextById("setting_header_empty", index_empty);
                }
            }
        else {
            appMsg.alert("No settings defined for '"+selected_entry+"'.")
            }
        }

    // show overview
    this.overview = function () {
        this.clear_frames();
        this.write(this.setting_header_cnt, lang("SETTINGS"), this.index()[0] );
        elementHidden(this.frames_settings[this.frames_settings.length-1]);
        }

    // show index views (overview or header)
    this.index = function (header=false, selected="") {
        var html       = "";
        var html_empty = "";

        if (header) {
            html += "<div style='display:flex;justify-content:center;width:100%'>";
            html += "<div class='setting_bg_inside'>";
            html += "<button class='settings_button_index header' onclick=\""+this.app_name+".create();\">"+this.index_image(true, "menu")+"</button>";

            html_empty += "<div style='display:flex;justify-content:center;width:100%'>";
            html_empty += "<div class='setting_bg_inside'>";
            html_empty += "<button class='settings_button_index header invisible'>&nbsp;</button>";
	        }
        else {
            this.loaded_index = true;
            }

        for (var key in this.setting_entries) {
	        var css_select = "";
	        var css_class  = "";
	        var image      = this.index_image(header, this.setting_entries[key][1], this.setting_entries[key][2]);
	        var text       = this.index_text(header, this.setting_entries[key][0], this.setting_entries[key][1]);

            var btype      = "";
	        var link       = "";
            if (header && this.setting_entries[key][2] == "")   { continue; }
	        else if (this.setting_entries[key][2] != "")        { link = this.app_name + ".create('" + key + "');"; }
            else                                                { btype = " info"; }

            if (key == selected)    { css_select = " selected"; }
            if (header)             { css_class  = " header"; }

            html       += "<button class='settings_button_index"+css_class+css_select+btype+"' onclick=\""+link+"\">"+image+text+"</button>";
            html_empty += "<button class='settings_button_index header invisible'>&nbsp;</button>";
	        }
        if (header) {
            html       += "</div></div>";
            html_empty += "</div></div>";
            }
        return [html, html_empty];
        }

    // prepare image for index
    this.index_image = function (header, image) {
        if (image == "")                { return ""; }
        if (image.indexOf("/") == -1)   { image = this.icon_dir + this.setting_icon_dir + image; }
        if (image.indexOf(".") == -1)   { image = image + this.setting_icon_end; }
        if (header)     { return "<img class='settings_icon_small' src='"+image+"' alt='["+image+"]' />"; }
        else            { return "<img class='settings_icon_big' src='"+image+"' alt='["+image+"]' />"; }
        }

    // prepare description for index
    this.index_text = function (header, text, image) {
        if (!header && image != "")     { return "<br/>&nbsp;<br/>" + text; }
        else if (!header)               { return text; }
        else                            { return ""; }
        }

    // show settings frames and hide content frames
    this.show = function (show_header=true, show_log=false) {
        this.active = true;
        this.show_entry(2); // first setting content or overview
        for (var i=3; i<this.frames_settings.length; i++)  { elementHidden(this.frames_settings[i]);  }
        for (var i=0; i<this.frames_content.length; i++)   { elementHidden(this.frames_content[i]);  }
        if (show_header)    { this.show_entry(0); this.show_entry(1); }
        else                { this.hide_entry(0); this.hide_entry(1); }
        if (show_log)       { this.show_entry(this.frames_settings.length-1); }
        else                { this.hide_entry(this.frames_settings.length-1); }
        }

    // show a specific setting frame
    this.show_entry = function (nr) {
        if (nr<0) { nr = this.frames_settings.length + nr; }
        if (nr==0) {
            elementVisible("setting_header")
            elementVisible("setting_header_empty")
            elementVisible("setting_header_empty2")
            }
        else {
            elementVisible(this.frames_settings[nr]);
            }
        }

    // show settings frames and hide content frames
    this.show_content = function () {
        this.active = false;
        for (var i=0; i<this.frames_content.length; i++)  { elementVisible(this.frames_content[i]);  }
        for (var i=0; i<this.frames_settings.length; i++) { elementHidden(this.frames_settings[i]); }
        }

    // hide settings frames
    this.hide = function () {
        this.active = true;
        for (var i=0; i<this.frames_settings.length; i++) { elementHidden(this.frames_settings[i]); }
        elementHidden("setting_header_empty");
        elementHidden("setting_header_empty2");
        }

    // hide settings frames
    this.hide_entry = function (nr) {
        if (nr<0) { nr = this.frames_settings.length + nr; }
        if (nr==0) {
            elementHidden("setting_header")
            elementHidden("setting_header_empty")
            elementHidden("setting_header_empty2")
            }
        else {
            elementHidden(this.frames_settings[nr]);
            }
        }

    // create demo entry - server and app information
    this.default_entry_info = function () {
        var html = "";
        this.clear_frames();
        this.tab.table_width = "290px";

        html += "<center><br/>";
        html += this.tab.start();
		html += this.tab.row(["Client:",	 appTitle]);
		html += this.tab.row(["",	         appVersion]);
		html += this.tab.row(["Modules:",
                                            "jcMsg "        + appMsg.appVersion + "<br/>" +
                                            "jcApp "     + appFW.appVersion + " / jcAppFW "   + appFwVersion + "<br/>" +
                                            "jcCookies " + appCookie.appVersion + "<br/>" +
                                            "jcFunction "+ jc_functions_version]);
        html += this.tab.line();
        html += this.tab.row(["Scroll position:", "<text id='scrollPosition'>0px</text>"]);
        html += this.tab.row(["Window width:",    "<text id='windowWidth'>please wait</text>"]);
        html += this.tab.row(["Device width:",    "<text id='screenWidth'>please wait</text>"]);
        html += this.tab.line();
        html += this.tab.row(["Device type:",     print_display_definition()]);
        html += this.tab.end();

		html +="<br/>&nbsp;";
        html += "</center>";

        this.write(1, "Information", html);
        this.show_entry(1);
        this.show_entry(-1);
        appForceReload(false);
        }

    // create demo entry - server and app information
    this.default_entry_demo = function () {
        var html = "";
        html += "<center>" + lang("NOT_IMPLEMENTED") + "</center>";
        this.clear_frames();
        this.show_entry(2);
        this.write(1, "Demo", html);
        }

    // add entry for settings (content to be defined somewhere else)
    this.add_entry = function (id, title, icon, call_function, show_header=true) {

        this.setting_entries[id] = [title, icon, call_function, show_header];
        }

    // clear all setting frames
    this.clear_frames = function (including_error_log=false) {

        var length = this.frames_settings.length;
        if (!including_error_log) { length -= 1; }
        for (var i=0; i<length; i++) { setTextById(this.frames_settings[i], ""); }
        }

    // clear all content frames
    this.clear_content_frames = function () {

        for (var i=0; i<this.frames_content.length; i++) { setTextById(this.frames_content[i], ""); }
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
			content += "<div class='setting_headline'><center><b>" + label + "</b></center></div>";
            content += "<hr class='setting_line' />";
            content += "<div style='padding:3px;'>" + text + "</div>";
            content += "<br/>";
			}
		else if (text != "")    { content = text; }

		setTextById(element, content);
		}
    }

app_framework_loaded += 1;