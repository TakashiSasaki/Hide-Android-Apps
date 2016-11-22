function setAllCheckbox(table_id, true_or_false){
    var table_element = document.getElementById(table_id);
    for(var i=0; i<table_element.rows.length; ++i){
        var tr_element = table_element.rows[i];
        for(var j=0; j<tr_element.cells.length; ++j){
            var td_element = tr_element.cells[j];
            var inner_td_element = td_element.firstChild;
            if(inner_td_element instanceof HTMLInputElement) {
                if(inner_td_element.type == "checkbox") {
                    inner_td_element.checked = true_or_false;
                }
            }
        }
    }
}

function checkAll(button){
    setAllCheckbox(button.value, true);
}

function uncheckAll(button){
    setAllCheckbox(button.value, false);
}
