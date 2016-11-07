import http.server
import json
import threading
import time
import urllib.parse
import webbrowser

import main


class HideAndroidAppsRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        request = urllib.parse.urlparse(self.path)
        query = request.query
        params = urllib.parse.parse_qs(query)
        body = None
        if "prop" in params.keys():
            adb = main.Adb()
            prop = adb.getProp()
            json_string = json.dumps(prop)
            callback_function_name = params["callback"][0]
            body = callback_function_name + "(" + json_string + ");"

        if body is not None:
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.send_header('Content-length', len(body))
            self.end_headers()
            self.wfile.write(body.encode())

        http.server.SimpleHTTPRequestHandler.do_GET(self)


class HideAndroidAppsHttpServer(http.server.HTTPServer):
    def __init__(self):
        http.server.HTTPServer.__init__(self, ("", 10000), HideAndroidAppsRequestHandler)
        self.toBeShutdown = False
        self.timeout = 10

    def handle_timeout(self):
        http.server.HTTPServer.handle_timeout(self)
        self.toBeShutdown = True


def openBrowserThread():
    time.sleep(1)
    webbrowser.open("http://localhost:10000/")


if __name__ == "__main__":
    threading.Thread(target=openBrowserThread).start()
    hide_android_apps_http_server = HideAndroidAppsHttpServer()
    while hide_android_apps_http_server.toBeShutdown is False:
        hide_android_apps_http_server.handle_request()
