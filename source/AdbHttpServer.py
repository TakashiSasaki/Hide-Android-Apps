import AdbRequestHandler
import http.server
import threading
import webbrowser
import time

class AdbHttpServer(http.server.HTTPServer):
    def __init__(self):
        http.server.HTTPServer.__init__(self, ("", 10000), AdbRequestHandler.AdbRequestHandler)
        self.toBeShutdown = False
        self.timeout = 200

    def handle_timeout(self):
        http.server.HTTPServer.handle_timeout(self)
        self.toBeShutdown = True


def openBrowserThread():
    time.sleep(2)
    webbrowser.open("http://localhost:10000/html/index.html")


if __name__ == "__main__":
    threading.Thread(target=openBrowserThread).start()
    hide_android_apps_http_server = AdbHttpServer()
    while hide_android_apps_http_server.toBeShutdown is False:
        hide_android_apps_http_server.handle_request()
