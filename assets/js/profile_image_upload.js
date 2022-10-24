$(document).ready(function(){
    $("#profile_image").click(function(e) {
        $("#image_upload").click();
    });
    
    function fasterPreview( uploader ) {
        if ( uploader.files && uploader.files[0] ){
            $('#profile_image').attr('src', 
            window.URL.createObjectURL(uploader.files[0]) );
        }
    }
    
    $("#image_upload").change(function(){
        fasterPreview( this );
    });
    UnoDropZone.init();
})