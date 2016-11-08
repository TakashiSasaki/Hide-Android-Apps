function updateProp(){
    var script_element = document.createElement("script");
    script_element.src = "/?prop=1&callback=callbackProp";
    document.body.appendChild(script_element);
    var div_element = document.getElementById("prop");
    while(div_element.firstChild) {
        div_element.removeChild(div_element.firstChild);
    }
}

function callbackProp(json_object){
    var table_element = document.createElement("table");
    for (var k in json_object) {
        var text_node_1 = document.createTextNode(k);
        var text_node_2 = document.createTextNode(json_object[k]);
        var td_element_1 = document.createElement("td");
        td_element_1.appendChild(text_node_1);
        var td_element_2 = document.createElement("td");
        td_element_2.appendChild(text_node_2);
        var tr_element = document.createElement("tr");
        tr_element.appendChild(td_element_1);
        tr_element.appendChild(td_element_2);
        table_element.appendChild(tr_element);
    }
    var div_element = document.getElementById("prop");
    div_element.appendChild(table_element);
    var model_form = document.getElementById("model");
    model_form.value = json_object["ro.product.model"];
}
