#!/usr/bin/python3

# In Progress:
# - ...
# Backlog:
# - show videos in day views (with play icon on it)
# - Optimize data handling
#   -> Queue for writing into JSON (e.g. for status changes)
#   -> using a CouchDB instead of JSON files
# - In progress (error!): Restart camera threads via API, Shutdown all services via API, Trigger RPi halt/reboot via API
# - password for external access (to enable admin from outside)
# - Idea: set to_be_deleted when below threshold; don't show / backup those files


import io, os, time
import logging
import json, codecs
import numpy as np
import signal, sys, string

import threading
import socketserver
from threading        import Condition
from http             import server
from datetime         import datetime, timedelta

#----------------------------------------------------

port = 8080

#----------------------------------------------------

def onexit(signum, handler):
    '''
    Clean exit on Strg+C
    All shutdown functions are defined in the "finally:" section in the end of this script
    '''
    time.sleep(1)
    print ('\nSTRG+C pressed! (Signal: %s)' % (signum,))
    while True:
        confirm = input('Enter "yes" to cancel programm now or "no" to keep running [yes/no]: ').strip().lower()
        if confirm == 'yes':
            print ("Cancel!\n")
            sys.exit()
        elif confirm == 'no':
            print ("Keep runnning!\n")
            break
        else:
            print ('Sorry, no valid answer...\n')
        pass


def onkill(signum, handler):
    '''
    Clean exit on kill command
    All shutdown functions are defined in the "finally:" section in the end of this script
    '''
    print('\nKILL command detected! (Signal: %s)' % (signum,))
    sys.exit()


#----------------------------------------------------


def read_html(directory, filename, content=""):
   '''
   read html file, replace placeholders and return for stream via webserver
   '''
   if filename.startswith("/"):  filename = filename[1:len(filename)]
   if directory.startswith("/"): directory = directroy[1:len(directory)]
   file = os.path.join(os.path.dirname(__file__), directory, filename)

   if not os.path.isfile(file):
     logging.warning("File '"+file+"' does not exist!")
     return ""

   with open(file, "r") as page:
     PAGE = page.read()
     
     for param in content:
       if "<!--"+param+"-->" in PAGE: PAGE = PAGE.replace("<!--"+param+"-->",str(content[param]))
       
     PAGE = PAGE.encode('utf-8')
   return PAGE


def read_image(directory,filename):
   '''
   read image file and return for stream via webserver
   '''
   if filename.startswith("/"):  filename = filename[1:len(filename)]
   if directory.startswith("/"): directory = directroy[1:len(directory)]
   file = os.path.join(os.path.dirname(__file__), directory, filename)

   if not os.path.isfile(file):
      logging.warning("Image '"+file+"' does not exist!")
      return ""

   with open(file, "rb") as image: f = image.read()
   return f


#----------------------------------------------------


class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):

    allow_reuse_address = True
    daemon_threads      = True


class StreamingHandler(server.BaseHTTPRequestHandler):

    def redirect(self,file):
        '''
        Redirect to other file / URL
        '''
        self.send_response(301)
#        self.send_header('Access-Control-Allow-Origin', '*')
#        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
#        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header('Location', '/index.html')
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.end_headers()


    def sendError(self):
        '''
        Send file not found
        '''
        self.send_error(404)
        self.end_headers()


    def streamFile(self,ftype,content,no_cache=False):
        '''
        send file content (HTML, image, ...)
        '''
        if len(content) > 0:
           self.send_response(200)
#           self.send_header("Access-Control-Allow-Origin", "*")
#           self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
#           self.send_header("Access-Control-Allow-Headers", "*")
           self.send_header('Content-Type', ftype)
           self.send_header('Content-Length', len(content))
           if no_cache:
             self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
             self.send_header("Pragma", "no-cache")
             self.send_header("Expires", "0")
           self.end_headers()
           self.wfile.write(content)
        else:
           self.sendError()

    #-------------------------------------

    def do_OPTIONS(self):
        self.send_response(200, "ok")
#        self.send_header('Access-Control-Allow-Origin', '*')
#        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        #self.send_header("Access-Control-Allow-Headers", "X-Requested-With")

    #-------------------------------------

    def do_POST(self):
        '''
        REST API for javascript commands e.g. to change values in runtime
        '''
        logging.debug("POST request with '" + self.path + "'.")
        response         = {}
        response["path"] = self.path
        response["API"]  = "Sample API"

        if '/api' in self.path:
           response["status"] = "success"

        else:
           response["status"] = "error"

        self.streamFile(ftype='application/json', content=json.dumps(response).encode(encoding='utf_8'), no_cache=True);

    #-------------------------------------

    def do_GET(self):
        '''
        check path and send requested content
        '''
        logging.debug("GET request with '" + self.path + "'.")
        response         = {}
        response["path"] = self.path
        response["API"]  = "Sample API"

        if '/' == self.path:
           self.streamFile(ftype='text/html', content=read_html("","/index.html"), no_cache=True);        
           
        if '/api' in self.path:
           response["status"] = "success"
           self.streamFile(ftype='application/json', content=json.dumps(response).encode(encoding='utf_8'), no_cache=True);

        elif self.path.endswith('.html'):  self.streamFile(ftype='text/html',       content=read_html("",self.path), no_cache=True);
        elif self.path.endswith('.css'):   self.streamFile(ftype='text/css',        content=read_html("",self.path), no_cache=True);
        elif self.path.endswith('.js'):    self.streamFile(ftype='application/javascript', content=read_html("",self.path), no_cache=True);
        elif self.path.endswith('.json'):  self.streamFile(ftype='application/json',       content=read_html("",self.path), no_cache=True);

        elif self.path.endswith('.jpg'):   self.streamFile(ftype='image/jpeg', content=read_image("",self.path), no_cache=True);
        elif self.path.endswith('.jpeg'):  self.streamFile(ftype='image/jpeg', content=read_image("",self.path), no_cache=True);
        elif self.path.endswith('.png'):   self.streamFile(ftype='image/png',  content=read_image("",self.path), no_cache=True);
        elif self.path.endswith('.ico'):   self.streamFile(ftype='image/ico',  content=read_image("",self.path), no_cache=True);
        elif self.path.endswith('.gif'):   self.streamFile(ftype='image/gif',  content=read_image("",self.path), no_cache=True);

        else:
           response["status"] = "error"
           self.streamFile(ftype='application/json', content=json.dumps(response).encode(encoding='utf_8'), no_cache=True);

#----------------------------------------------------

# execute only if run as a script
if __name__ == "__main__":

    # set logging
    if len(sys.argv) > 0 and "--logfile" in sys.argv:
       logging.basicConfig(filename=os.path.join(os.path.dirname(__file__),"00-sample-api.log"),
                           filemode='a',
                           format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
                           datefmt='%d.%m.%y %H:%M:%S',
                           level=logging.INFO)
       logging.info('-------------------------------------------')
       logging.info('Started ...')
       logging.info('-------------------------------------------')
    else:
       logging.basicConfig(format='%(levelname)s: %(message)s',level=logging.INFO)
       #logging.basicConfig(format='%(levelname)s: %(message)s',level=logging.DEBUG)
       
    # set system signal handler
    signal.signal(signal.SIGINT,  onexit)
    signal.signal(signal.SIGTERM, onkill)

   #----------------------------------------------------

    try:
        address = ('', port)
        server  = StreamingServer(address, StreamingHandler)

        logging.info("Starting WebServer ...")
        server.serve_forever()
        logging.info("OK.")

    finally:
        logging.info("Stopping WebServer ...")
        server.server_close()

