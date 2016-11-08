import http.server
import json
import threading
import time
import urllib.parse
import webbrowser

import Adb


class HideAndroidAppsRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        request = urllib.parse.urlparse(self.path)
        query = request.query
        params = urllib.parse.parse_qs(query)
        json_string = None

        if "prop" in params.keys():
            adb = Adb.Adb()
            prop = adb.getProp()
            json_string = json.dumps(prop)

        if "disabled_packages" in params.keys():
            adb = Adb.Adb()
            disabled_packages = adb.listDisabledPackages()
            json_string = json.dumps(disabled_packages)

        if "enabled_packages" in params.keys():
            adb = Adb.Adb()
            json_string = json.dumps(adb.listEnabledPackages())

        if "uninstalled_packages" in params.keys():
            adb = Adb.Adb()
            uninstalled_packages = adb.listUninstalledPackages()
            json_string = json.dumps(uninstalled_packages)

        if "processes" in params.keys():
            adb = Adb.Adb()
            processes = adb.listProcesses()
            json_string = json.dumps(processes)

        if json_string is not None:
            callback_function_name = params["callback"][0]
            body = callback_function_name + "(" + json_string + ");"
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.send_header('Content-length', len(body))
            self.send_header("Cache-Control", "max-age=0")
            self.end_headers()
            self.wfile.write(body.encode())
        else:
            http.server.SimpleHTTPRequestHandler.do_GET(self)


class HideAndroidAppsHttpServer(http.server.HTTPServer):
    def __init__(self):
        http.server.HTTPServer.__init__(self, ("", 10000), HideAndroidAppsRequestHandler)
        self.toBeShutdown = False
        self.timeout = 120

    def handle_timeout(self):
        http.server.HTTPServer.handle_timeout(self)
        self.toBeShutdown = True


def openBrowserThread():
    time.sleep(1)
    webbrowser.open("http://localhost:10000/html/index.html")


if __name__ == "__main__":
    threading.Thread(target=openBrowserThread).start()
    hide_android_apps_http_server = HideAndroidAppsHttpServer()
    while hide_android_apps_http_server.toBeShutdown is False:
        hide_android_apps_http_server.handle_request()
