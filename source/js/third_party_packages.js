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
