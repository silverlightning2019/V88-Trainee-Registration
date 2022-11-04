$(document).ready(function(){
    /* Triggers Date Picker Plugin */
    $( "#trainee_date_started , #trainee_date").datepicker();

    /* Sets contains() to be case insensitive.  */
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };

    /* Shows button at lower right side when window is scrolled at 20px and above  */
    $(window).scroll(function () {
        $(this).scrollTop()>20 ? $("#back_to_top_button").removeClass("hidden") : $("#back_to_top_button").addClass("hidden");
    });

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

    $("body")
        .on("click", "#trainee_btn_modal", openTraineeModalForAdd)
        .on("submit", "#trainee_form", submitTraineeModal)
        .on("click", ".edit", openTraineeModalForEdit)
        .on("click", "#cancel_btn", closeTraineeModal)
        .on("click", ".delete", openDeleteModal)
        .on("click", ".dm_confirm_btn", deleteTrainee)
        .on("click", "#back_to_top_button", scrollBackToTop)
        .on("keypress", "#add_trainee_search_input", addsKeypressEventOnSearchBar)
        .on("input", "#add_trainee_search_input", addsAutoScrollOnSearchBar)
});

/* DOCU: Opens Trainee Modal for adding <br />
 * Triggered by: .on("click", "#trainee_btn_modal", openTraineeModalForAdd) <br />
 * Last Updated Date: November 4, 2022 
 * @author: Silver  
 */
function openTraineeModalForAdd(){
    $(".filethumbnail").addClass("upload_image_icon font_size");
    $("#recruiter_block").removeClass("hidden");
    $("#status_block").addClass("hidden");
}

/* DOCU: Submits Trainee Modal <br />
 * Triggered by: .on("submit", "#trainee_form", submitTraineeModal) <br />
 * Last Updated Date: November 4, 2022 
 * @author: Silver  
 */
function submitTraineeModal(e){
    e.preventDefault();
    let trainee_id = $("#trainee_id").val();
    let trainee_name = $("#trainee_name").val();
    let trainee_specialization = $("#trainee_specialization").val();
    let trainee_date_started = $("#trainee_date").val();
    let trainee_recruiter = $("#trainee_recruiter").val();
    let trainee_note = $("#trainee_note").val();
    let data_id = $("#add_trainee_list .add_trainee_group").length;
    let new_trainee_id = "trainee_" + data_id;
    let trainee_item_clone = $("#hidden_trainee_clone .add_trainee_group").clone();
    let trainee_modal = $("#trainee_modal");    
    $(".alert").hide();

    if(trainee_id == ""){

        if(trainee_name != "" && trainee_specialization != "" && trainee_date_started != "" && trainee_recruiter != "" && trainee_note != ""){
            trainee_item_clone.find(".name").text(trainee_name);
            trainee_item_clone.find(".specialization").text(trainee_specialization);
            trainee_item_clone.find(".date").text(trainee_date_started);
            trainee_item_clone.find(".recruiter").text(trainee_recruiter);
            trainee_item_clone.find(".status .trainee_status_text").text("Trainee");
            $("#add_trainee_list").append(trainee_item_clone);
    
            trainee_item_clone.attr({'data-tooltip':trainee_note, 'data-id':data_id, 'id':new_trainee_id});
    
            $("#empty_list_text").hide(); 
    
            trainee_modal.find("input, textarea").val("");
            trainee_modal.modal('hide');
    
            $("#saved_toast").toast('show');
    
            $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    
            trainee_modal.find(".validate_input").removeClass("error");
            trainee_modal.find(".select_validate_input").removeClass("error");
        }
        else{
            trainee_modal.find(".validate_input").each((index, element) => {
                $(element).val() === "" ? $(element).addClass("error") : $(element).removeClass("error");
            });
            trainee_modal.find(".select_validate_input").each((index, element) => {
                $(element).find("select").val() === "" ? $(element).addClass("error") : $(element).removeClass("error");
            });
            
            $(".alert").show();
        }
    }
    else{
        let trainee_id = trainee_modal.find("#trainee_id").val();
        let trainee_id_selector = $('#' +trainee_id);
        let trainee_name = trainee_modal.find("#trainee_name").val();
        let trainee_specialization = trainee_modal.find("#trainee_specialization").val();
        let trainee_date = trainee_modal.find("#trainee_date").val();
        let trainee_status = trainee_modal.find("#trainee_status").val();
        let trainee_note = trainee_modal.find("#trainee_note").val();  

        $(".alert").hide();

        if(trainee_name != "" && trainee_specialization != "" && trainee_date != "" && trainee_status != "" && trainee_note != ""){
            trainee_id_selector.find(".name").text(trainee_name);
            trainee_id_selector.find(".specialization").text(trainee_specialization);
            trainee_id_selector.find(".date").text(trainee_date);
            trainee_id_selector.find(".status .edit_delete_container .trainee_status_text").text(trainee_status);
            trainee_id_selector.attr("data-tooltip", trainee_note);

            trainee_modal.find("#trainee_name, #trainee_date, #trainee_note").removeClass("error");
            trainee_modal.find("input, textarea").val("");
            trainee_modal.modal('hide');

            $("#saved_toast").toast('show');

            if(trainee_id_selector.find(".status .edit_delete_container .trainee_status_text").text() == "Trainee"){
                trainee_id_selector.find(".status").removeClass("employed");
                trainee_id_selector.find(".status").removeClass("unemployed");
            }
            
            if(trainee_id_selector.find(".status .edit_delete_container .trainee_status_text").text() == "Employed"){
                trainee_id_selector.find(".status").removeClass("unemployed");
                trainee_id_selector.find(".status").addClass("employed");
            }

            if(trainee_id_selector.find(".status .edit_delete_container .trainee_status_text").text() == "Unemployed"){
                trainee_id_selector.find(".status").addClass("unemployed");
            }
        }
        else{

            trainee_modal.find(".validate_input").each((index, element) => {
                $(element).val() === "" ? $(element).addClass("error") : $(element).removeClass("error");
            });
            
            $(".alert").show();
        }
    }
}

/* DOCU: Opens Trainee Modal for editing <br />
 * Triggered by: .on("click", ".edit", openTraineeModalForEdit) <br />
 * Last Updated Date: November 4, 2022
 * @author: Silver  
 */
function openTraineeModalForEdit(e){
    let trainee_modal = $("#trainee_modal");
    let trainee_id = $(this).closest(".add_trainee_group").attr("id");
    let full_trainee_id = "#"+trainee_id;
    let filethumbnail = $(".filethumbnail");
    let firstName = $('#trainee_name').val();
    let intials = firstName.charAt(0);
    let profileimage = filethumbnail.text(intials);

    trainee_modal.find(".trainee_id").text(trainee_id);
    
    let trainee_name = $(full_trainee_id).find(".name").text();
    let trainee_specialization = $(full_trainee_id).find(".specialization").text();
    let trainee_date = $(full_trainee_id).find(".date").text();
    let trainee_recruiter = $(full_trainee_id).find(".recruiter").text();
    let trainee_status = $(full_trainee_id).find(".status .edit_delete_container .trainee_status_text").text();
    let trainee_note = $(full_trainee_id).attr("data-tooltip");

    trainee_modal.find("#trainee_id").val(trainee_id);
    trainee_modal.find("#trainee_name").val(trainee_name);
    trainee_modal.find("#trainee_specialization").val(trainee_specialization);
    trainee_modal.find(".modal_specialization button").attr("title", trainee_specialization);
    trainee_modal.find(".modal_specialization .filter-option-inner-inner").text(trainee_specialization);
    trainee_modal.find("#trainee_date").val(trainee_date);
    trainee_modal.find(".modal_recruiter").val(trainee_recruiter);
    trainee_modal.find(".modal_recruiter button").attr("title", trainee_recruiter);
    trainee_modal.find(".modal_recruiter .filter-option-inner-inner").text(trainee_recruiter);
    trainee_modal.find("#trainee_status").val(trainee_status);
    trainee_modal.find(".modal_status button").attr("title", trainee_status);
    trainee_modal.find(".modal_status .filter-option-inner-inner").text(trainee_status);
    trainee_modal.find("#trainee_note").val(trainee_note);
    
    filethumbnail.removeClass("font_size");
    filethumbnail.removeClass("upload_image_icon");
    $("#recruiter_block").addClass("hidden");
    $("#status_block").removeClass("hidden");
}

/* DOCU: Closes Trainee Modal <br />
 * Triggered by: .on("click", "#cancel_btn", closeTraineeModal) <br />
 * Last Updated Date: November 4, 2022
 * @author: Silver  
 */
function closeTraineeModal(){
    let trainee_modal = $("#trainee_modal");
    trainee_modal.find(".validate_input").removeClass("error");
    trainee_modal.find(".select_validate_input").removeClass("error");
    trainee_modal.find("input, textarea").val("");  
    trainee_modal.modal('hide');
    $(".alert").hide();
}

/* DOCU: Opens Delete Modal <br />
 * Triggered by: .on("click", ".delete", opendeleteModal) <br />
 * Last Updated Date: November 4, 2022
 * @author: Silver  
 */
function openDeleteModal(){
    let trainee_id = $(this).closest(".add_trainee_group").attr("id");
    $("#trainee_id").text(trainee_id);
}

/* DOCU: Deletes Trainee <br />
 * Triggered by: .on("click", ".dm_confirm_btn", deleteTrainee) <br />
 * Last Updated Date: November 4, 2022
 * @author: Silver  
 */
function deleteTrainee(){
    let trainee_id = $("#trainee_id").text();
    $("#add_trainee_list").find("#"+trainee_id).remove();
    $("#deleted_toast").toast('show');
}

/* DOCU: Scrolls screen back to the top <br />
 * Triggered by: .on("click", ".dm_confirm_btn", deleteTrainee) <br />
 * Last Updated Date: November 4, 2022
 * @author: Silver  
 */
function scrollBackToTop(){
    $("html, body").animate({
        scrollTop: 0
    }, 1);
}

/* DOCU: Adds keypress event to search bar <br />
 * Triggered by: .on("keypress", "#add_trainee_search_input", addsKeypressEventOnSearchBar) <br />
 * Last Updated Date: November 4, 2022
 * @author: Silver  
 */
function addsKeypressEventOnSearchBar(){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        let value = $(this).val();
        $("html, body").animate({
            scrollTop: $("li:contains("+value+")")?.offset()?.top
        }, 1);
    }
}

/* DOCU: Adds auto scroll search feature on search bar <br />
 * Triggered by: .on("input", "#add_trainee_search_input", addsAutoScrollOnSeachBar) <br />
 * Last Updated Date: November 4, 2022
 * @author: Silver  
 */
function addsAutoScrollOnSearchBar(){
    let value = $(this).val();
    $("#search_icon")
        .on("click", function (){
            $("html, body").animate({
                scrollTop: $("li:contains("+value+")")?.offset()?.top
            }, 1);
        }
    );
}