import http.server
import json
import urllib.parse

import Adb


class AdbRequestHandler(http.server.SimpleHTTPRequestHandler):

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
            packages = adb.listEnabledPackages()
            json_string = json.dumps(packages)

        if "installed_packages" in params.keys():
            adb = Adb.Adb()
            packages = adb.listInstalledPackages()
            json_string = json.dumps(packages)

        if "uninstalled_packages" in params.keys():
            adb = Adb.Adb()
            uninstalled_packages = adb.listUninstalledPackages()
            json_string = json.dumps(uninstalled_packages)

        if "system_packages" in params.keys():
            adb = Adb.Adb()
            packages = adb.listSystemPackages()
            json_string = json.dumps(packages)

        if "third_party_packages" in params.keys():
            adb = Adb.Adb()
            packages = adb.listThirdPartyPackages()
            json_string = json.dumps(packages)

        if "processes" in params.keys():
            adb = Adb.Adb()
            processes = adb.listProcesses()
            json_string = json.dumps(processes)

        if "unhide_package" in params.keys():
            adb = Adb.Adb()
            package = params["package"]
            result_string = adb.unhidePackage(package)
            json_string = json.dumps({"result_string": result_string});

        if "hide_package" in params.keys():
            adb = Adb.Adb()
            package = params["package"]
            result_string = adb.hidePackage(package)
            json_string = json.dumps({"result_string": result_string})

        if "enable_package" in params.keys():
            adb = Adb.Adb()
            package = params["package"]
            result_string = adb.enablePackage(package)
            json_string = json.dumps({"result_string": result_string})

        if "getAdbVersion" in params.keys():
            adb = Adb.Adb()
            json_string = json.dumps({"adbVersion": adb.adbVersion})

        if "get_adb_path" in params.keys():
            adb = Adb.Adb()
            json_string = json.dumps({"adbPath": adb.adbPath})

        if "get_devices" in params.keys():
            adb = Adb.Adb()
            json_string = json.dumps(adb.devices)

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
