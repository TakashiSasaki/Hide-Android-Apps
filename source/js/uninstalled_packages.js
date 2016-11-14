function updateUninstalledPackages(){
    var table_element = document.getElementById("uninstalled_packages");
    while(table_element.firstChild) {
        table_element.removeChild(table_element.firstChild);
    }
    document.getElementById("number_of_uninstalled_packages").value = "updating";
    var script_element = document.createElement("script");
    script_element.src = "/?uninstalled_packages=1&callback=callbackUninstalledPackages";
    document.body.appendChild(script_element);
}

function createTdElementWithTextContent(x){
    var td = document.createElement("td");
    td.textContent = x;
    return td;
}

function callbackUninstalledPackages(json_object){
    window.localStorage.setItem("uninstalled_packages", JSON.stringify(json_object));
    var table_element = getEmptyElement("uninstalled_packages");
    //var table_element = document.getElementById("uninstalled_packages");
    for (var k in json_object) {
        var tr_element = document.createElement("tr");
        tr_element.appendChild(createTdElementWithTextContent(k));
        tr_element.appendChild(createTdElementWithTextContent(json_object[k]));
        tr_element.appendChild(createTdElementWithCheckbox());
        tr_element.appendChild(createTdElementWithTextContent(loadPackageDescription(json_object[k])));
        table_element.appendChild(tr_element);
    }
    document.getElementById("number_of_uninstalled_packages").value = json_object.length;
}

function checkAllUninstalledPackages(){
    var table_element = document.getElementById("uninstalled_packages");
    for(var i in table_element.children){
        var tr_element = table_element.children[i];
        var td_element = tr_element.children[2];
        var input_element = td_element.firstChild;
        input_element.checked = true;
    }
}

function unhidePackages(){
    var table_element = document.getElementById("uninstalled_packages");
    for(var i in table_element.children){
        var input_element = table_element.children[i].children[2].firstChild;
        if(input_element.checked == true) {
          var td = table_element.children[i].children[1];
          var script_element = document.createElement("script");
          script_element.src ="/?unhide_package=1&callback=callbackUnhidePackage&package=" + td.textContent;
          document.body.appendChild(script_element);
        }
     }
}

function callbackUnhidePackage(json_object){
    alert(json_object.result_string);
}

function reloadUninstalledPackages(){
    getEmptyElement("uninstalled_packages");
    var json_string = window.localStorage.getItem("uninstalled_packages");
    if(json_string) {
        var json_object = JSON.parse(json_string);
        callbackUninstalledPackages(json_object);
    }
}