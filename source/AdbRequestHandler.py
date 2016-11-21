import http.server
import json
import re
import urllib.parse

import Adb


class AdbRequestHandler(http.server.SimpleHTTPRequestHandler):
    __slots__ = ["methodsGet", "methodsPost"]
    regexGet = re.compile("^get")
    regexPost = re.compile("^post")
    adb = Adb.Adb()

    def __init__(self, request, client_address, server):
        self.methodsGet = list()
        self.methodsPost = list()
        for x in self.__dir__():
            try:
                if hasattr(self.__getattribute__(x), "__func__"):
                    if self.regexGet.match(x):
                        self.methodsGet.append(x)
                    elif self.regexPost.match(x):
                        self.methodsPost.append(x)
            except AttributeError:
                pass
        print(self.methodsGet)
        print(self.methodsPost)
        http.server.SimpleHTTPRequestHandler.__init__(self, request, client_address, server)

    def do_GET(self):
        request = urllib.parse.urlparse(self.path)
        query = request.query
        params = urllib.parse.parse_qs(query)
        json_string = None
        callback_function_name = None

        for x in self.methodsGet:
            if x in params.keys():
                if "callback" in params.keys():
                    callback_function_name = params["callback"][0]
                else:
                    callback_function_name = x + "Callback"
                json_string = self.__getattribute__(x)(params)

        if "third_party_packages" in params.keys():
            adb = Adb.Adb()
            packages = adb.listThirdPartyPackages()
            json_string = json.dumps(packages)

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

        if "get_devices" in params.keys():
            adb = Adb.Adb()
            json_string = json.dumps(adb.devices)

        if json_string is not None:
            if callback_function_name is None:
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

    def getTest(self, params):
        print(params)

    def getPropDict(self, params):
        print("AdbRequestHandler.getPropDict")
        d = self.adb.getPropDict()
        print(d)
        return json.dumps(d)

    def getAdbVersion(self, params):
        return json.dumps(self.adb.adbVersion)

    def getAdbPath(self, params):
        return json.dumps(self.adb.adbPath)

    def getProcessList(self, params):
        print(AdbRequestHandler.getProcessList)
        return json.dumps(self.adb.listProcesses())

    def getDisabledPackageList(self, params):
        disabled_packages = self.adb.listDisabledPackages()
        return json.dumps(disabled_packages)

    def getEnabledPackageList(self, param):
        return json.dumps(self.adb.listEnabledPackages())

    def getInstalledPackageList(self, param):
        packages = self.adb.listInstalledPackages()
        return json.dumps(packages)

    def getUninstalledPackageList(self, param):
        uninstalled_packages = self.adb.listUninstalledPackages()
        return json.dumps(uninstalled_packages)

    def getSystemPackageList(self, param):
        packages = self.adb.listSystemPackages()
        return json.dumps(packages)
