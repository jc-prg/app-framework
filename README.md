# jc://app-framework/

App-framework for HTML/Javascript web client and REST API server

## Features

* create frames and drop down menues
* adaptive layout: dark theme, different screensizes (samples)
* usable as web app for iOS (via link on homescreen)
* send requests to REST API and visualize data, show api status

## Technology

* HTML5, Javascript
* jc://modules/
* Python (for sample server and maintenance script)

## Installation

* Prerequisite: git installed
* Clone framework (e.g. as submodule of your own git project)
* Integrate:
  * copy ./index.html to /your/app/directory/index.html
  * copy ./app-fw/config_\*.sample.js-files to /your/app/directory/js-files/config_\*.js
  * adapt paths to css- & js-files in /your/app/directory/index.html
  * add your own css- & js-files to the /your/app/directory/index.html
  * integrate your code into /your/app/directory/js-files/config_main.js


