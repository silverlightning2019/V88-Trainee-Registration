$(document).ready(function(){
    $("body").on("click", ".edit", function(){
        var firstName = $('#trainee_name').val();
        var intials = firstName.charAt(0);
        var profileimage = $('.filethumbnail').text(intials);
    });
  });