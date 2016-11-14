function updateInstalledPackages(){
    var table_element = document.getElementById("installed_packages");
    while(table_element.firstChild) {
        table_element.removeChild(table_element.firstChild);
    }
    document.getElementById("number_of_installed_packages").value = "updating";
    var script_element = document.createElement("script");
    script_element.src = "/?installed_packages=1&callback=callbackInstalledPackages";
    document.body.appendChild(script_element);
}

function callbackInstalledPackages(json_object){
    window.localStorage.setItem("installed_packages", JSON.stringify(json_object));
    var table_element = document.getElementById("installed_packages");
    for (var k in json_object) {
        var td_element_k = document.createElement("td");
        td_element_k.textContent = k;
        var td_element_v = document.createElement("td");
        var package_name = json_object[k];
        td_element_v.textContent = package_name;
        var tr_element = document.createElement("tr");
        var json_string = window.localStorage.getItem(package_name);
        if(json_string) {
            var package_description = JSON.parse(json_string)[4];
        }
        var td_element_description = document.createElement("td");
        td_element_description.textContent = package_description;
        tr_element.appendChild(td_element_k);
        tr_element.appendChild(td_element_v);
        tr_element.appendChild(td_element_description);
        table_element.appendChild(tr_element);
    }
    document.getElementById("number_of_installed_packages").value = json_object.length;
}

function reloadInstalledPackages(){
    var json_string = window.localStorage.getItem("installed_packages");
    if(json_string) {
        var json_object = JSON.parse(json_string);
        callbackInstalledPackages(json_object);
    }
}
