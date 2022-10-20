/** 
*   DOCU: Trainees Page Script
*   Last updated at: October 20, 2022
*   @author Silver
*/

$(document).ready(function(){
    $("body")
        .on("mouseenter", ".status", function(){
            $(this).html('<button class="edit">Edit</button> <button class="delete">Delete</button>');
        });

    $("body")
        .on("mouseleave", ".status", function(){
            $(this).html("Employed");
        });
});