function createTdElementWithTextContent(x){
    var td = document.createElement("td");
    td.textContent = x;
    return td;
}

function createTdElementWithCheckbox(value){
    var td = document.createElement("td");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = value;
    td.appendChild(input);
    return td;
}

function createTdElementWithButton(value, text, onclick){
    var td = document.createElement("td");
    var button = document.createElement("button");
    button.value = value;
    button.textContent = text;
    button.onclick = onclick;
    td.appendChild(button);
    return td;
}

function loadPackageDescription(k){
    var json_string = window.localStorage.getItem(k);
    if(json_string){
        var json_object = JSON.parse(json_string);
        return json_object[4];
    }
    return "";
}

function index(){
    var model = window.localStorage.getItem("model");
    if (model != undefined) {
        var input_element = document.getElementById("model");
        input_element.value = model;
    }
    setTimeout(requestJsonP, 1000, "getAdbVersion");
    setTimeout(requestJsonP, 1000, "getAdbPath");
}


function hideCheckedPackages(table_element_id){
    var table_element = document.getElementById(table_element_id);
    for(var i = 0; i<table_element.children.length; ++i){
        var tr = table_element.children[i];
        var package_name = tr.children[1].textContent;
        var input = tr.children[2].firstChild;
        if(input.checked == true) {
            var script = document.createElement("script");
            script.src="/?hide_package=1&package=" + package_name + "&callback=callbackHidePackage";
            document.body.appendChild(script);
        }
    }
}

function callbackHidePackage(json_object){
    alert(json_object.result_string);
}

function requestJsonP(method_name, parameter_object){
    script_src = "/?" + method_name + "=1&callback=" + method_name+"Callback";
    for(var i in parameter_object){
        script_src += "&" + i + "=" + parameter_object[i];
    }
    var script = document.createElement("script");
    script.src = script_src;
    document.body.appendChild(script);
}

function getAdbVersionCallback(s){
    var input = document.getElementById("adb_version");
    input.value = s;
}

function getAdbPathCallback(s){
    var input = document.getElementById("adb_path");
    input.value = s;
}

index();
