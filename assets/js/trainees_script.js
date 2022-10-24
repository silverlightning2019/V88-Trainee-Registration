/** 
*   DOCU: Trainees Page Script
*   Last updated at: October 20, 2022
*   @author Silver
*/

$(document).ready(function(){
    // $(function(){
    //     $(".add_trainee_group").tooltip();
    // });

    $(window).on('load', function() {
        $(".add_trainee_group").tooltip();
    });
    // $("body")
    //     .on("mouseenter", ".status", function(){
    //         let trainee_status = $(this).text();
    //         $(this).html('<button class="edit" data-toggle="modal" data-target="#edit_trainee_modal">Edit</button> <button class="delete" data-toggle="modal" data-target="#delete_trainee_modal">Delete</button>');
    //     }
    // );

    // $("body")
    //     .on("mouseleave", ".status", function(){
    //         let trainee_status = $(this).text();
    //         $(this).html("Training");
    //     }
    // );

    $("body")
        .on("click", "#add_trainee_modal", function(){
               
        }
    );

    // $("#trainee_date_started").datepicker();

    $("body")
        .on("click", ".save_btn", function(){
            let trainee_name = $("#trainee_fullname").val();
            let trainee_specialization = $("#trainee_specialization").val();
            let trainee_date_started = $("#trainee_date_started").val();
            let trainee_recruiter = $("#trainee_recruiter").val();
            let trainee_note = $("#trainee_note").val();
            let data_id = $("#add_trainee_list .add_trainee_group").length;
            let trainee_id = "trainee_" + data_id;
            let trainee_item_clone = $("#hidden_trainee_clone .add_trainee_group").clone();

            $(".alert").hide();

            if(trainee_name != "" && trainee_specialization != "" && trainee_date_started != "" && trainee_recruiter != "" && trainee_note != ""){
                trainee_item_clone.find(".name").text(trainee_name);
                trainee_item_clone.find(".specialization").text(trainee_specialization);
                trainee_item_clone.find(".date").text(trainee_date_started);
                trainee_item_clone.find(".recruiter").text(trainee_recruiter);
                trainee_item_clone.find(".status span").text("Trainee");
                $("#add_trainee_list").append(trainee_item_clone);

                trainee_item_clone.attr({'data-tooltip':trainee_note, 'data-id':data_id, 'id':trainee_id});

                $("#empty_list_text").hide(); 
                $("#add_trainee_modal").find("input, textarea, select").val("");
                $("#add_trainee_modal").find("#trainee_fullname, .modal_specialization, #trainee_date_started, .modal_recruiter").css("border", "transparent");

                $("#add_trainee_modal").modal('hide');
            }
            else{
                if(trainee_name == ""){
                    $("#trainee_fullname").css("border", "0.5px solid red");
                }
                if(trainee_specialization == ""){
                    $(".modal_specialization").css("border", "0.5px solid red");
                }
                if(trainee_date_started == ""){
                    $("#trainee_date_started").css("border", "0.5px solid red");
                }
                if(trainee_recruiter == ""){
                    $(".modal_recruiter").css("border", "0.5px solid red");
                }
                if(trainee_note == ""){
                    $("#trainee_note").css("border", "0.5px solid red");
                }
                $(".alert").show();
            }
        }
    );

    $("body")
        .on("click", ".cancel_btn", function(){
            $("#add_trainee_modal").find("#trainee_fullname, .modal_specialization, #trainee_date_started, .modal_recruiter").css("border", "transparent");
            $("#add_trainee_modal").modal('hide');
            $(".alert").hide();
        }
    );

    $("body").on("click", ".edit", function(){
        let trainee_id = $(this).closest(".add_trainee_group").attr("id");
        let full_trainee_id = "#"+trainee_id;

        $("#edit_trainee_modal").find("#trainee_id").text(trainee_id);
        let trainee_name = $(full_trainee_id).find("#name").text();
        let trainee_specialization = $(full_trainee_id).find("#specialization").text();
        let trainee_date = $(full_trainee_id).find("#date").text();
        let trainee_status = $(full_trainee_id).find("#status .edit_delete_container span").text();
        let trainee_note = $(full_trainee_id).attr("data-tooltip");

        $("#edit_trainee_modal").find("#trainee_name").val(trainee_name);
        $("#edit_trainee_modal").find("#trainee_specialization").val(trainee_specialization);
        $("#edit_trainee_modal").find(".modal_specialization button").attr("title", trainee_specialization);
        $("#edit_trainee_modal").find(".modal_specialization .filter-option-inner-inner").text(trainee_specialization);
        $("#edit_trainee_modal").find("#trainee_date").val(trainee_date);
        $("#edit_trainee_modal").find("#trainee_status").val(trainee_status);
        $("#edit_trainee_modal").find(".modal_status .filter-option-inner-inner").text("Trainee");
        $("#edit_trainee_modal").find("#trainee_note").val(trainee_note);
    });

    $("body").on("click", ".edit_save_btn", function(){
        let edit_modal = $("#edit_trainee_modal");
        let trainee_id = edit_modal.find("#trainee_id").text();
        let trainee_id_selector = $('#' +trainee_id);

        let trainee_name = edit_modal.find("#trainee_name").val();
        let trainee_specialization = edit_modal.find("#trainee_specialization").val();
        let trainee_date = edit_modal.find("#trainee_date").val();
        let trainee_status = edit_modal.find("#trainee_status").val();
        let trainee_note = edit_modal.find("#trainee_note").val();  

        $(".alert").hide();

        

        if(trainee_name != "" && trainee_specialization != "" && trainee_date_started != "" && trainee_status != "" && trainee_note != ""){
            trainee_id_selector.find("#name").text(trainee_name);
            trainee_id_selector.find("#specialization").text(trainee_specialization);
            trainee_id_selector.find("#date").text(trainee_date);
            trainee_id_selector.find("#status .edit_delete_container span").text(trainee_status);
            trainee_id_selector.attr("data-tooltip", trainee_note);

            edit_modal.find("#trainee_name, #trainee_date, #trainee_note").css("border", "transparent");
            edit_modal.modal('hide');
        }
        else{
            if(trainee_name == ""){
                edit_modal.find("#trainee_name").css("border", "0.5px solid red");
            }
            if(trainee_specialization == ""){
                edit_modal.find("#trainee_specialization").css("border", "0.5px solid red");
            }
            if(trainee_date == ""){
                edit_modal.find("#trainee_date").css("border", "0.5px solid red");
            }
            if(trainee_recruiter == ""){    
                edit_modal.find("#trainee_status").css("border", "0.5px solid red");
            }
            if(trainee_note == ""){
                edit_modal.find("#trainee_note").css("border", "0.5px solid red");
            }
            $(".alert").show();
        }

       
    });

    $("body")
        .on("click", ".edit_cancel_btn", function(){
            $("#edit_trainee_modal").find("#trainee_name, #trainee_date", "#trainee_note").css("border", "transparent");
            $("#edit_trainee_modal").modal('hide');
            $(".alert").hide();
        }
    );

    $("body").on("click", ".delete", function(){
        let trainee_id = $(this).closest(".add_trainee_group").attr("id");
        $("#trainee_id").text(trainee_id);
        console.log(trainee_id);
    });

    $("body").on("click", ".dm_confirm_btn", function(){
        let trainee_list = $("#add_trainee_list");
        let trainee_id = $("#trainee_id").text();
        trainee_list.find('li[id ='+trainee_id+']').remove();
    });
});