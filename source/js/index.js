function index(){
    var model = window.localStorage.getItem("model");
    var input_element = document.getElementById("model");
    input_element.value = model;
}

index();
