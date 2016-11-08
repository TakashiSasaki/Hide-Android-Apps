function updateEnabledPackages(){
    var table_element = document.getElementById("enabled_packages");
    while(table_element.firstChild) {
        table_element.removeChild(table_element.firstChild);
    }
    var script_element = document.createElement("script");
    script_element.src = "/?enabled_packages=1&callback=callbackEnabledPackages";
    document.body.appendChild(script_element);
}

function callbackEnabledPackages(json_object){
    var table_element = document.getElementById("enabled_packages");
    for(var k in json_object) {
        var tr_element = document.createElement("tr");
        var td_element_k = document.createElement("td");
        td_element_k.textContent = k;
        tr_element.appendChild(td_element_k);
        var td_element_v = document.createElement("td");
        td_element_v.textContent = json_object[k];
        tr_element.appendChild(td_element_v);
        table_element.appendChild(tr_element);
    }
    table_element.select();
}
