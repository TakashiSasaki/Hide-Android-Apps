function getEmptyElement(id_string){
    var element = document.getElementById(id_string);
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
    return element;
}

function updateInstalledPackages(){
    var table_element = getEmptyElement("installed_packages");
    document.getElementById("number_of_installed_packages").value = "updating";
    var script_element = document.createElement("script");
    script_element.src = "/?getInstalledPackageList=1";
    document.body.appendChild(script_element);
}

function getInstalledPackageListCallback(json_object){
    window.localStorage.setItem("installed_packages", JSON.stringify(json_object));
    var table_element = document.getElementById("installed_packages");
    for (var k in json_object) {
        var tr_element = document.createElement("tr");
        tr_element.appendChild(createTdElementWithTextContent(k));
        tr_element.appendChild(createTdElementWithTextContent(json_object[k]));
        tr_element.appendChild(createTdElementWithCheckbox());
        tr_element.appendChild(createTdElementWithTextContent(loadPackageDescription(json_object[k])));
        table_element.appendChild(tr_element);
    }
    document.getElementById("number_of_installed_packages").value = json_object.length;
}

function reloadInstalledPackages(){
    getEmptyElement("installed_packages");
    var json_string = window.localStorage.getItem("installed_packages");
    if(json_string) {
        var json_object = JSON.parse(json_string);
        callbackInstalledPackages(json_object);
        alert("loaded " + json_object.length + " package(s).")
    } else {
        alert("no installed package.")
    }
}
