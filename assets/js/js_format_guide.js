$(document).ready(function(){
    $("body")
        .on("click", "#element", selectedElement)
        .on("submit", "#element_form", submitElementForm)
});

/* DOCU: sample <br />
 * Triggered by: .on("click", "#element", selectedElement) <br />
 * Last Updated Date: January 20, 2022 
 * @author: Silver  
 */
function selectedElement(){
    console.log("TEST")
}

function submitElementForm(){

}