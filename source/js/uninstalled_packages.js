function updateUninstalledPackages(){
    var div_element = document.getElementById("uninstalled_packages");
    while(div_element.firstChild) {
        div_element.removeChild(div_element.firstChild);
    }
    var script_element = document.createElement("script");
    script_element.src = "/?uninstalled_packages=1&callback=callbackUninstalledPackages";
    document.body.appendChild(script_element);
}

function callbackUninstalledPackages(json_object){
    var table_element = document.createElement("table");
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
    var div_element = document.getElementById("uninstalled_packages");
    div_element.appendChild(table_element);
}
