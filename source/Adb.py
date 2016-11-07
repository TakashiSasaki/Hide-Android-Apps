import os
import re
import subprocess

KUSO_AU = "https://docs.google.com/spreadsheets/d/1fgjgo91icfwia12ozOj67etb2ubi10bHM9VDoFeVgxY/pub?gid=11078667&single=true&output=csv"
KUSO_SONY = "https://docs.google.com/spreadsheets/d/1fgjgo91icfwia12ozOj67etb2ubi10bHM9VDoFeVgxY/pub?gid=309729536&single=true&output=csv"

class Adb():
    def __init__(self):
        current_directory = os.getcwd()
        candidates = []
        candidates.append(current_directory + os.path.sep + "adb.exe")
        candidates.append(current_directory + os.path.sep + ".." + os.path.sep + "adb.exe")
        candidates.append(current_directory + os.path.sep + ".." + os.path.sep + "adb" + os.path.sep + "adb.exe")
        for candidate in candidates:
            try:
                completed_process = subprocess.run([candidate], stderr = subprocess.STDOUT, stdout=subprocess.PIPE)
                #print(completed_process.returncode)
                #print(type(completed_process.stdout))
                lines = completed_process.stdout.decode().split("\n")
                m = re.compile("Android Debug Bridge version ([0-9.]+)").match(lines[0])
                self.adbVersion = m.group(1)
                self.adbPath = candidate
            except Exception as e:
                pass

    def enumerateDevices(self):
        lines = self.exec(["devices"])
        if len(lines) < 4:
            raise RuntimeError("No device")
        devices = []
        for line in lines[1:]:
            try:
                device = re.compile("(.+)\tdevice").match(line).group(1)
                devices.append(device)
            except Exception as e:
                pass
        self.devices = devices
        return self.devices

    def exec(self, args):
        completed_process = subprocess.run([self.adbPath] + args, stdout=subprocess.PIPE)
        return completed_process.stdout.decode().split("\r\n")

    def listPackages(self, args = []):
        lines = self.exec(["shell", "pm", "list", "packages"] + args)
        package_names = []
        for line in lines:
            try :
                package_name = re.compile("^package:[ \r]*([^ \r]+)[ \r]*").match(line).group(1)
                package_names.append(package_name)
            except Exception as e:
                pass
        package_names.sort()
        return package_names

    def listPackagesIncludingUninstalled(self):
        return self.listPackages(["-u"])

    def listUninstalledPackages(self):
        return list(diffLists(self.listPackages(), self.listPackagesIncludingUninstalled())[2])

    def listDisabledPackages(self):
        return self.listPackages(["-d"])

    def listEnabledPackages(self):
        return self.listPackages(["-e"])

    def listSystemPackages(self):
        return self.listPackages(["-s"])

    def listThirdPartyPackages(self):
        return self.listPackages(["-3"])

    def listUninstalledThirdPartyPackages(self):
        return list(diffLists(self.listThirdPartyPackages(), self.listUninstalledPackages())[2])

    def hidePackage(self, package_name):
        return self.exec(["shell", "pm", "hide", package_name])

    def unhidePackage(self, package_name):
        return self.exec(["shell", "pm", "unhide", package_name])

    def enablePackage(self, package_name):
        return self.exec(["shell", "pm", "enable", package_name])

    def disablePackage(self, package_name):
        return self.exec(["shell", "pm", "disable", package_name])

    def listProcesses(self):
        lines = self.exec(["shell", "ps"])
        p = re.compile("(u\w+)\s+\d+\s+\d+\s+\d+\s+\d+\s+\w+\s+\w+\s+\w+\s+(\S+)")
        process_names = []
        for line in lines:
            try:
                m = p.match(line)
                if m is None:
                    continue
                process_name = m.group(2)
                process_names.append(process_name)
            except Exception as e:
                pass
        return process_names

    def getProp(self):
        lines = self.exec(["shell", "getprop"])
        p = re.compile("\[(\S+)\]:\s\[(\S+)\]")
        prop = dict()
        for line in lines:
            try:
                m = p.match(line)
                if m is None:
                    continue
                else:
                    prop[m.group(1)] = m.group(2)
            except Exception as e:
                pass
        return prop

    def testNumberOfPackages(self):
        n_all_installed = len(self.listPackages())
        n_all_uninstalled = len(self.listUninstalledPackages())
        n_enabled = len(self.listEnabledPackages())
        n_disabled = len(self.listDisabledPackages())
        n_system = len(self.listSystemPackages())
        n_third_party = len(self.listThirdPartyPackages())
        print("Installed :", n_all_installed)
        print("Uninstalled :", n_all_uninstalled)
        print("Enabled:", n_enabled)
        print("Disabled:", n_disabled)
        print("System:", n_system)
        print("Third Party:", n_third_party)


def diffLists(list1, list2):
    list1 = set(list1)
    list2 = set(list2)
    list1only = set()
    list2only = set()
    both = set()
    for l1 in list1:
        if l1 in list2:
            both.add(l1)
        else:
            list1only.add(l1)
    for l2 in list2:
        if l2 in list1:
            both.add(l2)
        else:
            list2only.add(l2)
    return (list1only, both, list2only)


def fetchPackageNames(url):
    import urllib.request
    import http.client
    r = urllib.request.urlopen(url)
    assert(isinstance(r, http.client.HTTPResponse))
    s = r.read().decode().split("\r\n")
    import csv
    csv_reader = csv.reader(s, delimiter=",", quotechar="'")
    package_names = []
    for record in csv_reader:
        try :
            package_name = re.compile("package:(\S+)").match(record[0]).group(1)
            package_names.append(package_name)
        except Exception as e:
            package_names.append(record[0])
    return package_names


if __name__ == "__main__":
    adb = Adb()
    print(adb.getProp())
    exit()

    disabled_packages = adb.listDisabledPackages()
    for x in disabled_packages:
        adb.enablePackage(x)
    installed_packages = adb.listPackages()
    kuso_au = fetchPackageNames(KUSO_AU)
    for x in kuso_au:
        if x in installed_packages:
            adb.hidePackage(x)
    kuso_sony = fetchPackageNames(KUSO_SONY)
    for x in kuso_sony:
        if x in installed_packages:
            adb.hidePackage(x)
    processes = adb.listProcesses()
    print(processes)

