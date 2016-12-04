function updateDatabase(){
    var model = document.getElementById("model").value;
    //alert(model);
    var database_url = "https://script.google.com/macros/s/AKfycbwujUj5du8-Om7N2-1DaIqlpeoyB6cDyKx_tkuToM4d2OiKOjnX/exec";
    database_url += "?callback_function_name=updateDatabaseCallback";
    requestJsonP2(database_url);
}

function updateDatabaseCallback(json_object){
    for(var i in json_object){
        window.localStorage.setItem(json_object[i][0], JSON.stringify(json_object[i]));
        //alert(json_object[i]);
    }
    alert("downloaded " + json_object.length + " packages information.")
}
