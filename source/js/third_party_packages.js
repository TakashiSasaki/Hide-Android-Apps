function updateThirdPartyPackages(){
    var table_element = document.getElementById("third_party_packages");
    while(table_element.firstChild) {
        table_element.removeChild(table_element.firstChild);
    }
    document.getElementById("number_of_third_party_packages").value = "updating";
    var script_element = document.createElement("script");
    script_element.src = "/?third_party_packages=1&callback=callbackThirdPartyPackages";
    document.body.appendChild(script_element);
}

function callbackThirdPartyPackages(json_object){
    var table_element = document.getElementById("third_party_packages")
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
    document.getElementById("number_of_third_party_packages").value = json_object.length;
}

text_to_copy = "";

function copyThirdPartyPackages(){
    var table_element = document.getElementById("third_party_packages");
    var model = document.getElementById("model").value;
    text_to_copy = "";
    for(var i=0; i<table_element.children.length; ++i){
        var tr_element = table_element.children[i];
        //alert(tr_element);
        text_to_copy += tr_element.children[1].textContent + "\t" + model + "\t3\n";
    }
    window.addEventListener("copy", function(e){
        //alert(e.clipboardData);
        e.clipboardData.setData("text", text_to_copy);
    });
    document.execCommand("copy");
}
