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

function callbackUninstalledPackages(json_object){
    var table_element = document.getElementById("uninstalled_packages");
    for (var k in json_object) {
        var td_element_k = document.createElement("td");
        td_element_k.textContent = k;
        var td_element_v = document.createElement("td");
        td_element_v.textContent = json_object[k];
        var tr_element = document.createElement("tr");
        var input_element_checkbox = document.createElement("input");
        input_element_checkbox.type = "checkbox";
        var td_element_checkbox = document.createElement("td");
        td_element_checkbox.appendChild(input_element_checkbox);
        tr_element.appendChild(td_element_k);
        tr_element.appendChild(td_element_v);
        tr_element.appendChild(td_element_checkbox);
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
