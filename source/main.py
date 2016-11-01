import os, subprocess

class Adb():
    def __init__(self):
        current_directory = os.getcwd()
        candidates = []
        candidates.append(current_directory + os.path.sep + "adb.exe")
        candidates.append(current_directory + os.path.sep + ".." + os.path.sep + "adb.exe")
        candidates.append(current_directory + os.path.sep + ".." + os.path.sep + "adb" + os.path.sep + "adb.exe")
        for candidate in candidates:
            try:
                completed_process = subprocess.run([candidate], stderr = subprocess.STDOUT)
                print(completed_process.returncode)
            except Exception as e:
                print(e)


if __name__ == "__main__":
    adb = Adb()
