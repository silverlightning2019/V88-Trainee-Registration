$(document).ready(function(){
    $("body").on("click", "#edit_trainee_btn_modal", function(){
        $("body").removeClass("#recruiter_block");
        $("#recruiter_block").hide();
        $("#status_block").show();
    });
    $("body").on("click", "#add_trainee_btn_modal", function(){
        $("#recruiter_block").show();
        $("#status_block").hide();
    });
}); 