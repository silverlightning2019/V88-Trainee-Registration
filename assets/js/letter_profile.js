$(document).ready(function(){
    var firstName = $('#trainee_name').text();
    var intials = firstName.charAt(0);
    var profileImage = $('#profileImage').text(intials);
  });