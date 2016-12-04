function hidePackage(package_name){
    if(package_name == undefined){
        package_name = this.value;
    }
    package_name = /^[^:]+/.exec(package_name);
    var script = document.createElement("script");
    script.src="/?hidePackage=1&package=" + package_name;
    document.body.appendChild(script);
}

function hidePackageCallback(result_string){
    alert(result_string);
}

function enablePackage(package_name){
    if(package_name == undefined){
        package_name = this.value;
    }
    requestJsonP("enablePackage", {package: package_name});
}

function enablePackageCallback(result_string){
    alert(result_string);
}

function unhidePackage(package_name){
    if(package_name == undefined){
        package_name = this.value;
    }
    requestJsonP("unhidePackage", {package:package_name});
}

function unhidePackageCallback(result_string){
    alert(result_string);
}

function disablePackage(package_name){
    if(package_name == undefined){
        package_name = this.value;
    }
    requestJsonP("disablePackage", {package:package_name});
}

function disablePackageCallback(result_string){
    alert(result_string);
}
