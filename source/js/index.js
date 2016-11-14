function createTdElementWithCheckbox(){
    var td = document.createElement("td");
    var input = document.createElement("input")
    input.type = "checkbox";
    td.appendChild(input);
    return td;
}

function loadPackageDescription(k){
    var json_string = window.localStorage.getItem(k);
    if(json_string){
        var json_object = JSON.parse(json_string);
        return json_object[4];
    }
    return "";
}

function index(){
    var model = window.localStorage.getItem("model");
    var input_element = document.getElementById("model");
    input_element.value = model;
}

index();
