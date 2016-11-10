function updateProcesses(){
    var table_element = document.getElementById("processes");
    while(table_element.firstChild) {
        table_element.removeChild(table_element.firstChild);
    }
    document.getElementById("number_of_running_processes").value = "updating";
    var script_element = document.createElement("script");
    script_element.src = "/?processes=1&callback=callbackProcesses";
    document.body.appendChild(script_element);
}

function callbackProcesses(json_object){
    var table_element = document.getElementById("processes");
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
    document.getElementById("number_of_running_processes").value = json_object.length;
}
