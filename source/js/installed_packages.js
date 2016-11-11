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
    var table_element = document.getElementById("installed_packages");
    for (var k in json_object) {
        var td_element_k = document.createElement("td");
        td_element_k.textContent = k;
        var td_element_v = document.createElement("td");
        td_element_v.textContent = json_object[k];
        var tr_element = document.createElement("tr");
        tr_element.appendChild(td_element_k);
        tr_element.appendChild(td_element_v);
        table_element.appendChild(tr_element);
    }
    document.getElementById("number_of_installed_packages").value = json_object.length;
}
