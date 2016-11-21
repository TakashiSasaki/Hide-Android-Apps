function updateDisabledPackages(){
    var table_element = document.getElementById("disabled_packages");
    while(table_element.firstChild) {
        table_element.removeChild(div_element.firstChild);
    }
    //window.scrollTo(0, table_element.getBoudingClientRect().top + window.pageYOffset);
    document.getElementById("number_of_disabled_packages").value="updating";
    var script_element = document.createElement("script");
    script_element.src = "/?getDisabledPackageList=1";
    document.body.appendChild(script_element);
}

function getDisabledPackageListCallback(json_object){
    var table_element = document.getElementById("disabled_packages");
    for(var k in json_object) {
        var tr_element = document.createElement("tr");
        var td_element_k = document.createElement("td");
        td_element_k.textContent = k;
        tr_element.appendChild(td_element_k);
        var td_element_v = document.createElement("td");
        td_element_v.textContent = json_object[k];
        tr_element.appendChild(td_element_v);
        var td_element_checkbox = document.createElement("td");
        var input_element = document.createElement("input");
        input_element.type="checkbox";
        td_element_checkbox.appendChild(input_element);
        tr_element.appendChild(td_element_checkbox);
        table_element.appendChild(tr_element);
    }
    document.getElementById("number_of_disabled_packages").value=json_object.length;
}

function enableCheckedPackages(package_name){
    var table_element = document.getElementById("disabled_packages");
    for(var i in table_element.children){
        tr_element = table_element.children[i];
        package_name = tr_element.children[1].textContent;
        input_element = tr_element.children[2].firstChild;
        if(input_element.checked == true){
            var script_element = document.createElement("script")
            script_element.src="/?enable_package=1&callback=callbackEnablePackage&package=" + package_name;
            document.body.appendChild(script_element);
        }
    }
}

function callbackEnablePackage(json_object){
    alert(json_object.result_string);
}
