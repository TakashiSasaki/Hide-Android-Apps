function updateDisabledPackages(){
    var div_element = document.getElementById("disabled_packages");
    while(div_element.firstChild) {
        div_element.removeChild(div_element.firstChild);
    }
    var script_element = document.createElement("script");
    script_element.src = "/?disabled_packages=1&callback=callbackDisabledPackages";
    document.body.appendChild(script_element);
}

function callbackDisabledPackages(json_object){
    var div_element = document.getElementById("disabled_packages");
    var table_element = document.createElement("table");
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
    div_element.appendChild(table_element);
}
