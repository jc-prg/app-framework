//--------------------------------------
// jc://app-framework/, (c) Christoph Kloth
//--------------------------------------

//-------------------------------------------------------------
// general functions ...
//-------------------------------------------------------------

function image(file) {
        return "<img src='icon/"+file+"' style='height:15px;margin:0px;padding:0px;' alt='"+file+"' />";
        }
        
// ------------------------------------------

function dict_size(d) {
	var c=0;
	for (var i in d) {c++;}
	return c;
	}

// ------------------------------------------

function button (onclick,label, id="") {
        return "<button style=\"width:150px;margin:1px;\" onClick=\"javascript:"+onclick+"\" id=\""+id+"\">"+label+"</button>";
        }


// ------------------------------------------

function add_link(link, description="") {
        if (description == "") { description = link; }
        return "<a href=\"" + link + "\" target=\"_blank\" style=\"color:white\">" + description + "</a><br/>";
        }

// ------------------------------------------

function clickMenu () {

   if (document.getElementById("remote_nav").style.display == "none") {
     if (document.getElementById("menuItems").style.visibility == "hidden")     { document.getElementById("menuItems").style.visibility = "visible"; }
     else                                                                       { document.getElementById("menuItems").style.visibility = "hidden"; }
     }
   else { document.getElementById("menuItems").style.visibility = "hidden"; }
   }

//-------------------------------------------------------------
// mbox specific functions ...
//-------------------------------------------------------------

function appHtmlButton( button, cmd="", color="blue", small="", display="block" ) {

        var text  = "";

        if (button != "empty") {
                text +=   "<div class=\"player_button "+color+" "+small+"\" onclick=\"javascript:"+cmd+"\" style=\"display:"+display+";\">";
                text +=   "<img src=\"icon/"+button+".png\" class=\"player_image "+small+"\"></div>";
                }
        else {
                text +=   "<div class=\"player_button empty "+small+"\"></div>";
                }

        return text;
        }

// create button with sendCmd command
//--------------------------------------

function appHtmlButton2( sendCmd, label ) {
	return "<button onclick='javascript:appFW.sendCmd(" + sendCmd + ", mboxControl)'>" + label + "</button>";
	}

//-------------------------------------------------------------

function appHtmlToolTipLeft(i) {
        var count = 3;
        var width = document.body.clientWidth;
        if (width > 705) { mbox_list_count = 6; }
        else             { mbox_list_count = 3; }

        // calculate if last album in row, than tooltip should show to the left
        var pos = i-(Math.floor(i/mbox_list_count) * mbox_list_count);
        if (pos == 0) { return " left"; }
        }

//-------------------------------------------------------------

function appHtmlToolTip( type, count=0, input_text="" ) {

	var text = "";
	if (type == "start") {
	        text += "<div class='tooltip'>";
		}
	else if (type == "end") {
	        text += "<span class='triangle1'></span>";
        	text += "<span class='triangle2'></span>";
	        text += "<span class=\"tooltiptext " + appHtmlToolTipLeft(count) + "\">" + input_text + "</span>";
        	text += "<div class='album_triangle'  id=\"album_tri1_" + count + "\"></div>";
	        text += "<div class='album_triangle2' id=\"album_tri2_" + count + "\"></div>";
        	text += "</div>";
		}
	return text;
	}

//-------------------------------------------------------------

function appHtmlScrollTo( type, uuid="" ) {
	var text = "";
	if (type == "start") {
		text += "<div id=\"scrollto_" + uuid.replace(/-/g,"") + "\">";
		}
	else if (type == "end") {
		text += "</div>";
		}
	return text;
	}

//-------------------------------------------------------------

function appHtmlEntryDetail( count ) {
	var text = "";
	text += "<div class=\"album_detail\" id=\"album_"+count+"\" style=\"display:none\">"+count+" / " + document.body.clientWidth + "</div>";
	return text;
	}

//-------------------------------------------------------------

function appHtmlTableNew( cells=[], divide=false, width="100%", height="" ) {

	var cells_width = [];

        // set width of colums
	if (divide == true) 		{ var cell_width = 100 / cells.length + "%"; }
	else if (divide != false)	{ cells_width    = divide; }
	else				{ var cell_width = ""; }

        // return start, end or row
        if (cells == "start")      { return "<table border=\"0\" width=\"" + width + "\" height=\"" + height + "\">"; }
        else if (cells == "end")   { return "</table>"; }
	else  {
		var text = "<tr>";
		for (var i=0;i<cells.length;i++) { 
			if (cells_width != [])	{ width = cells_width[i]; }
			else			{ width = cell_width; }
			text += "<td width=\"" + width + "\">" + cells[i] + "</td>";
			}
		text    += "</tr>";
		return text;
		}
        }


//-------------------------------------------------------------

function appHtmlTable(p1,p2="",p3="",p4="") {

        // set width of colums
        var w = [];
        if (p2=="" && p2 != 0 && p3=="" && p4=="")      { w = ["100%","0%","0%","0%"]; }
        else if (p3=="" && p4=="")       	      	{ w = ["50%","50%","0%","0%"]; }
        else if (p4=="")                 	 	{ w = ["33%","33%","33%","0%"]; }
        else                                    	{ w = ["25%","25%","25%","25%"]; }

        // return start, end or row
        if (p1 == "start")      { return "<table border=\"0\" width=\"100%\">"; }
        else if (p1 == "end")   { return "</table>"; }
	else                    { return "<tr><td width=\""+w[0]+"\">"+p1+"</td><td width=\""+w[1]+"\">"+p2+"</td><td width=\""+w[2]+"\">"+p3+"</td><td width=\""+w[3]+"\">"+p4+"</td></tr>"; }
        }


//-------------------------------------------------------------

function appHtmlInputElement( name, data ) {
	var text = "";

	if (typeof data == "string") { text += "<input id='"+name+"' name='"+name+"' value='"+data+"'>"; }
//	else if (!data) { text += "<input id='"+name+"' name='"+name+"' value=''> (undefined)"; }
	else if (data) {
	        var str = JSON.stringify(data);
        	str = str.replace(/,/g,",<br/>");
        	str = str.replace(/{/g,"{<br/>");
        	str = str.replace(/}/g,"}<br/>");
		text += "<div id='"+name+"' style='border:solid 1px lightgray;background:#eeeee;width:250px;height:60px;overflow:auto;'>"+str+"</div>";
		}

	return text;
	}

//--------------------------------------

function appHtmlSetNavTitle (title) {
        setTextById("navTitle", "<div onClick=\"javascript:if(mbox_settings){mboxSettingsToggle();};appCookie.erase('appCookie');\">"+title+"</div>");
        }

// ------------------------------------------

function appHtmlSetButtonConfig	(data) {

	// definition of button color
        button_color = data["button_colors"];

	// definition of images for buttons
        button_img2  = data["button_images"];
        for (var key in button_img2) {
                button_img[key] = image(button_img2[key]);
                }
        }

//----------------------------------------------------------------

function appHtmlShowLoading(data) {
	var text = "<b>" + lang("RELOAD_STARTED") + ":</b><br/><br/><div id='reload_info' style='border-style:solid 1px;'>x</div>";
	appMsg.alert(text);
	}

//-------------------------------------------------------------

function appHtmlShowDataObject(data) {
	if (data) {
	        var str = JSON.stringify(data);
        	str = str.replace(/,/g,",<br/>");
        	str = str.replace(/{/g,"{<br/>");
        	str = str.replace(/}/g,"}<br/>");
		}
	else {
		str = "No data returned!";
		}

        appMsg.confirm(
       	        "<div style=\"text-align:left;overflow:auto;width:95%;height:200px;border:solid 1px;\">"+str+"</div>",
               	"",280);
        }

//-------------------------------------------------------------

function appHtmlShowJson(data) {
	var text = "<b>" + lang("RELOAD_STARTED") + "</b>";
	appMsg.alert(text);
	}

app_framework_loaded += 1;
