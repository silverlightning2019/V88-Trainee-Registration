/** 
*   DOCU: Trainees Page Script
*   Last updated at: October 27, 2022
*   @author Silver
*/

$(document).ready(function(){

    /* Sets contains() to be case insensitive.  */
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };

    /* Shows button at lower right side when window is scrolled at 20px and above  */
    $(window).scroll(function () {
        $(this).scrollTop()>20 ? $("#back_to_top_button").removeClass("hidden") : $("#back_to_top_button").addClass("hidden");
    });

    /* Scrolls back to the top  */
    $("body")
        .on("click", "#back_to_top_button", function(e){
            $("html, body").animate({
                scrollTop: 0
            }, 1);
        }
    );

    /* Adds keypress event on search bar  */
    $("#add_trainee_search_input").on("keypress", function(event){
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            let value = $(this).val();
            $("html, body").animate({
                scrollTop: $("li:contains("+value+")")?.offset()?.top
            }, 1);
        }
    });
    
    /* Adds auto scroll search feature on search bar.  */
    $("#add_trainee_search_input")
        .on("input", function(){
            let value = $(this).val();
            $("#search_icon")
                .on("click", function (){
                    $("html, body").animate({
                        scrollTop: $("li:contains("+value+")")?.offset()?.top
                    }, 1);
                }
            );
        }
    );

    /* Adds a new trainee to the trainee list */
    $("body")
        .on("submit", "#trainee_modal", function(e){            
            e.preventDefault();
            let trainee_name = $("#trainee_name").val();
            let trainee_specialization = $("#trainee_specialization").val();
            let trainee_date_started = $("#trainee_date").val();
            let trainee_recruiter = $("#trainee_recruiter").val();
            let trainee_status = $("#trainee_status").val();
            let trainee_note = $("#trainee_note").val();
            let data_id = $("#add_trainee_list .add_trainee_group").length;
            let trainee_id = "trainee_" + data_id;
            let trainee_item_clone = $("#hidden_trainee_clone .add_trainee_group").clone();
            let trainee_modal = $("#trainee_modal");    
            $(".alert").hide();

            if(trainee_name != "" && trainee_specialization != "" && trainee_date_started != "" && trainee_recruiter != "" && trainee_status != "" && trainee_note != ""){
                trainee_item_clone.find(".name").text(trainee_name);
                trainee_item_clone.find(".specialization").text(trainee_specialization);
                trainee_item_clone.find(".date").text(trainee_date_started);
                trainee_item_clone.find(".recruiter").text(trainee_recruiter);
                trainee_item_clone.find(".status .trainee_status_text").text(trainee_status);
                $("#add_trainee_list").append(trainee_item_clone);

                trainee_item_clone.attr({'data-tooltip':trainee_note, 'data-id':data_id, 'id':trainee_id});

                $("#empty_list_text").hide(); 

                trainee_modal.find("input, textarea, select").val("");
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
    );
    
    /* Closes Add Trainee Modal */
    $("body")
        .on("click", "#cancel_btn", function(){
            let trainee_modal = $("#trainee_modal");
            trainee_modal.find(".validate_input").removeClass("error");
            trainee_modal.find(".select_validate_input").removeClass("error");
            trainee_modal.find(".validate_input").val("");  
            trainee_modal.modal('hide');
            $(".alert").hide();
        }
    );

    /* Opens Edit Trainee Modal */
    $("body")
        .on("click", ".edit", function(){
            let trainee_modal = $("#trainee_modal");
            let trainee_id = $(this).closest(".add_trainee_group").attr("id");
            let full_trainee_id = "#"+trainee_id;

            trainee_modal.find(".trainee_id").text(trainee_id);
            
            let trainee_name = $(full_trainee_id).find(".name").text();
            let trainee_specialization = $(full_trainee_id).find(".specialization").text();
            let trainee_date = $(full_trainee_id).find(".date").text();
            let trainee_recruiter = $(full_trainee_id).find(".recruiter").text();
            let trainee_status = $(full_trainee_id).find(".status .edit_delete_container .trainee_status_text").text();
            let trainee_note = $(full_trainee_id).attr("data-tooltip");

            trainee_modal.find("#trainee_name").val(trainee_name);
            trainee_modal.find("#trainee_specialization").val(trainee_specialization);
            trainee_modal.find(".modal_specialization button").attr("title", trainee_specialization);
            trainee_modal.find(".modal_specialization .filter-option-inner-inner").text(trainee_specialization);
            trainee_modal.find("#trainee_date").val(trainee_date);
            trainee_modal.find(".modal_recruiter").val(trainee_recruiter);
            trainee_modal.find(".modal_recruiter .filter-option-inner-inner").text(trainee_recruiter);
            trainee_modal.find("#trainee_status").val(trainee_status);
            trainee_modal.find(".modal_status .filter-option-inner-inner").text(trainee_status);
            trainee_modal.find("#trainee_note").val(trainee_note);
        }
    );
    
    /* Saves new data on Edit Trainee Modal */
    $("body")
        .on("submit", "#edit_save_btn", function(e){
            e.preventDefault();

            let trainee_modal = $("#trainee_modal");
            let trainee_id = trainee_modal.find(".trainee_id").text();
            let trainee_id_selector = $('#' +trainee_id);
            let trainee_name = trainee_modal.find(".trainee_name").val();
            let trainee_specialization = trainee_modal.find(".trainee_specialization").val();
            let trainee_date = trainee_modal.find(".trainee_date").val();
            let trainee_status = trainee_modal.find(".trainee_status").val();
            let trainee_note = trainee_modal.find(".trainee_note").val();  

            $(".alert").hide();

            if(trainee_name != "" && trainee_specialization != "" && trainee_date != "" && trainee_status != "" && trainee_note != ""){
                trainee_id_selector.find("#name").text(trainee_name);
                trainee_id_selector.find("#specialization").text(trainee_specialization);
                trainee_id_selector.find("#date").text(trainee_date);
                trainee_id_selector.find("#status .edit_delete_container .trainee_status_text").text(trainee_status);
                trainee_id_selector.attr("data-tooltip", trainee_note);

                trainee_modal.find("#trainee_name, #trainee_date, #trainee_note").removeClass("error");
                trainee_modal.modal('hide');
                $("#saved_toast").toast('show');

                if(trainee_id_selector.find("#status .edit_delete_container .trainee_status_text").text() == "Trainee"){
                    trainee_id_selector.find("#status").removeClass("employed");
                    trainee_id_selector.find("#status").removeClass("unemployed");
                }
                
                if(trainee_id_selector.find("#status .edit_delete_container .trainee_status_text").text() == "Employed"){
                    trainee_id_selector.find("#status").removeClass("unemployed");
                    trainee_id_selector.find("#status").addClass("employed");
                }

                if(trainee_id_selector.find("#status .edit_delete_container .trainee_status_text").text() == "Unemployed"){
                    trainee_id_selector.find("#status").addClass("unemployed");
                }
            }
            else{

                trainee_modal.find(".edit_validate_input").each((index, element) => {
                    $(element).not("div").val() === "" ? $(element).addClass("error") : $(element).removeClass("error");    
                });

                trainee_modal.find(".validate_input").removeClass("error");
                $(".alert").show();

                $("#trainee_modal").find("#trainee_name, #trainee_date, #trainee_note").removeClass("error");
            }
        }
    );
    
    /* Closes Edit Trainee Modal */
    $("body")
        .on("click", "#edit_cancel_btn", function(){
            $("#trainee_modal").find("#trainee_name, #trainee_date, #trainee_note").removeClass("error");
            $("#trainee_modal").modal('hide');
            $(".alert").hide();
        }
    );
    
    /* Opens Delete Trainee Modal */
    $("body")
        .on("click", ".delete", function(){
            let trainee_id = $(this).closest(".add_trainee_group").attr("id");
            $("#trainee_id").text(trainee_id);
        }
    );

    /* Confirms deleting trainee and closes delete trainee modal */
    $("body")
        .on("click", ".dm_confirm_btn", function(){
            let trainee_list = $("#add_trainee_list");
            let trainee_id = $("#trainee_id").text();
            trainee_list.find("#"+trainee_id).remove();
            $("#deleted_toast").toast('show');
        }
    );
});