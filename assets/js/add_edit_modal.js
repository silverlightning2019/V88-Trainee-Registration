$(document).ready(function(){
    $("body").on("click", "#edit_trainee_btn_modal", function(){
        $(".filethumbnail").removeClass("font_size");
        $(".filethumbnail").addClass("letter_profile");
        $(".filethumbnail").removeClass("upload_image_icon");
        $("#recruiter_block").hide();
        $("#status_block").show();
    });
    $("body").on("click", "#trainee_btn_modal", function(){
        $(".filethumbnail").addClass("upload_image_icon");
        $(".filethumbnail").addClass("font_size");
        $("#recruiter_block").show();
        $("#status_block").hide();
    });
}); 