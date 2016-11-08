function updateProcesses(){
    var div_element = document.getElementById("processes");
    while(div_element.firstChild) {
        div_element.removeChild(div_element.firstChild);
    }
    var script_element = document.createElement("script");
    script_element.src = "/?processes=1&callback=callbackProcesses";
    document.body.appendChild(script_element);
}

function callbackProcesses(json_object){
    var div_element = document.getElementById("processes");
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
