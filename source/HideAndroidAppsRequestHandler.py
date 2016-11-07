import http.server
import threading
import time
import webbrowser


class HideAndroidAppsRequestHandler(http.server.SimpleHTTPRequestHandler):
    pass


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
