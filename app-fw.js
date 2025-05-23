//--------------------------------
// jc://app-framework/
//--------------------------------

console.log("jc://app-framework/");

app_framework_loaded = 0;

app_js = [
    "app-fw/app-functions.js",
    "app-fw/app-html-elements.js",
    "app-fw/app-menu.js",
    "app-fw/app-language.js",
    "app-fw/app-conf.js",
    "app-fw/app-main.js",
    "app-fw/app-settings.js",
    ];

// adapt the following files to your needs and load them together with your app
app_js_sample = [
    "app-fw/config_stage.sample.js",
    "app-fw/config_language.sample.js",
    "app-fw/config_main.sample.js",
    ];

app_css = [
    "app-fw/style-main.css",
    "app-fw/style-menu.css",
    "app-fw/style-frame.css",
    "app-fw/style-status.css",
    "app-fw/style-main-iphone.css",
    "app-fw/style-main-laptop.css",
    "app-fw/style-frame-iphone.css",
    "app-fw/style-frame-laptop.css",
    "app-fw/style-main-dark.css",
    "app-fw/style-frame-dark.css",
    "app-fw/style-menu-dark.css"
    ];

function framework_modules_loaded() {
    if (app_framework_loaded == app_js.length)  { return true; }
    else                                        { return false; }
    }