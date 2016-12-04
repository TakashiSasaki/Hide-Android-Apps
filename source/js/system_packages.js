function updateSystemPackages(){
    var table_element = document.getElementById("system_packages");
    while(table_element.firstChild) {
        table_element.removeChild(table_element.firstChild);
    }
    document.getElementById("number_of_system_packages").value = "updating";
    requestJsonP("getSystemPackageList");
    //var script_element = document.createElement("script");
    //script_element.src = "/?getSystemPackageList=1";
    //document.body.appendChild(script_element);
}

function getSystemPackageListCallback(json_object){
    var table_element = document.getElementById("system_packages");
    for (var k in json_object) {
        var tr_element = document.createElement("tr");
        tr_element.appendChild(createTdElementWithTextContent(k));
        tr_element.appendChild(createTdElementWithTextContent(json_object[k]));
        tr_element.appendChild(createTdElementWithCheckbox());
        tr_element.appendChild(createTdElementWithTextContent(loadPackageDescription(json_object[k])));
        table_element.appendChild(tr_element);
    }
    document.getElementById("number_of_system_packages").value = json_object.length;
}

text_to_copy = "";

function copySystemPackages(){
    var table_element = document.getElementById("system_packages");
    var model = document.getElementById("model").value;
    text_to_copy = "";
    for(var i=0; i<table_element.children.length; ++i){
        var tr_element = table_element.children[i];
        //alert(tr_element);
        text_to_copy += tr_element.children[1].textContent + "\t" + model + "\ts\n";
    }
    window.addEventListener("copy", function(e){
        //alert(e.clipboardData);
        e.clipboardData.setData("text", text_to_copy);
    });
    document.execCommand("copy");
}

