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
    window.localStorage.setItem("processes", JSON.stringify(json_object));
    var table_element = document.getElementById("processes");
    for(var k in json_object) {
        var tr_element = document.createElement("tr");
        var td_element_k = document.createElement("td");
        td_element_k.textContent = k;
        tr_element.appendChild(td_element_k);
        var td_element_v = document.createElement("td");
        td_element_v.textContent = json_object[k];
        tr_element.appendChild(td_element_v);
        var td_element_description = document.createElement("td");
        var json_string = window.localStorage.getItem(json_object[k]);
        if(json_string){
            td_element_description.textContent = JSON.parse(json_string)[4];
        }
        tr_element.appendChild(td_element_description);
        table_element.appendChild(tr_element);
    }
    document.getElementById("number_of_running_processes").value = json_object.length;
}

function copyProcesses(){
    var table_element = document.getElementById("processes");
    var model = document.getElementById("model").value;
    text_to_copy = "";
    for(var i=0; i<table_element.children.length; ++i){
        var tr_element = table_element.children[i];
        //alert(tr_element);
        text_to_copy += tr_element.children[1].textContent + "\t" +  model + "\n";
    }
    window.addEventListener("copy", function(e){
        //alert(e.clipboardData);
        e.clipboardData.setData("text", text_to_copy);
    });
    document.execCommand("copy");
}

function reloadProcesses(){
     var json_string = window.localStorage.getItem("processes");
     if(json_string) {
        var json_object = JSON.parse(json_string);
        updateProcesses(json_object);
        alert("loaded " + json_object.length + " processes.")
     } else {
        alert("no saved process.");
     }
}
