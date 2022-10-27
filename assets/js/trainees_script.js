/** 
*   DOCU: Trainees Page Script
*   Last updated at: October 27, 2022
*   @author Silver
*/

$(document).ready(function(){

    // //Pagination
    // let number_of_groups = $("#add_trainee_list .add_trainee_group").length;
    // let limit_per_page = 10;
    // let total_pages = Math.round(number_of_groups / limit_per_page);
    // $(".pagination").append("<li id='prev_page' class='page-item'><a class='page-link' href='#'>Prev</a></li>");
    // $(".pagination").append("<li class='page-item current_page active'><a class='page-link' href='#'>"+ 1 +"</a></li>");
    // for(let i=2; i<=total_pages; i++){
    //     $(".pagination").append("<li class='page-item current_page'><a class='page-link' href='#'>"+ i +"</a></li>");
    // }
    
    // $(".pagination").append("<li id='next_page' class='page-item'><a class='page-link' href='#'>Next</a></li>");

    // $(".pagination li.current_page")
    //     .on("click", function(){
    //         if($(this).hasClass("active")){
    //             return false;   
    //         }
    //         else{
    //             let current_page = $(this).index();
    //             let total_groups = limit_per_page * current_page;
    //             $(".pagination li").removeClass("active");
    //             $(this).addClass("active");
    //             $("#add_trainee_list .add_trainee_group").hide();
                
    //             for (let i = total_groups - limit_per_page; i < total_groups; i++){
    //                 $("#add_trainee_list .add_trainee_group:eq("+ i +")").show();
    //             }
    //         }
    //     }
    // );

    // $("#next_page")
    //     .on("click", function(){
    //         let current_page = $(".pagination li.active").index();
    //         if (current_page === total_pages){
    //             return false;
    //         }
    //         else{
    //             current_page++;
    //             let total_groups = limit_per_page * current_page;
    //             $(".pagination li").removeClass("active");
    //             $("#add_trainee_list .add_trainee_group").hide();

    //             for (let i = total_groups - limit_per_page; i < total_groups; i++){
    //                 $("#add_trainee_list .add_trainee_group:eq("+ i +")").show();
    //             }

    //             $(".pagination li.current_page:eq("+ (current_page - 1) + ")").addClass("active");
    //         }
    //     }
    // );
    
    // $("#prev_page")
    //     .on("click", function(){
    //         let current_page = $(".pagination li.active").index();
    //         if (current_page === 1){
    //             return false;
    //         }
    //         else{
    //             current_page--;
    //             let total_groups = limit_per_page * current_page;
    //             $(".pagination li").removeClass("disabled");
    //             $(".pagination li").removeClass("active");
    //             $("#add_trainee_list .add_trainee_group").hide();

    //             for (let i = total_groups - limit_per_page; i < total_groups; i++){
    //                 $("#add_trainee_list .add_trainee_group:eq("+ i +")").show();
    //             }

    //             $(".pagination li.current_page:eq("+ (current_page - 1) + ")").addClass("active");
    //         }
    //     }
    // );

    // $("#add_trainee_list .add_trainee_group:gt("+ (limit_per_page-1) +")").hide();
    // //

    $(window)
        .on('load', function() {
            $(".add_trainee_group").tooltip();
        }
    );

    $("#add_trainee_search_input")
        .on("input", function(){
            let value = $(this).val();
            $("#search_icon").on("click", function (){
                $("html, body").animate({
                    scrollTop: $("li:contains("+value+")")?.offset()?.top
                }, 1);
            });
        }
    );

    $("body")
        .on("click", ".save_btn", function(e){
            e.preventDefault();

            let trainee_name = $("#trainee_fullname").val();
            let trainee_specialization = $("#trainee_specialization").val();
            let trainee_date_started = $("#trainee_date_started").val();
            let trainee_recruiter = $("#trainee_recruiter").val();
            let trainee_note = $("#trainee_note").val();
            let data_id = $("#add_trainee_list .add_trainee_group").length;
            let trainee_id = "trainee_" + data_id;
            let trainee_item_clone = $("#hidden_trainee_clone .add_trainee_group").clone();
            let add_trainee_modal = $("#add_trainee_modal");

            // console.log($(".form_input_item").index(".form_input_item"));

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

                add_trainee_modal.find("input, textarea, select").val("");
                add_trainee_modal.find("#trainee_fullname, .modal_specialization, #trainee_date_started, .modal_recruiter").removeClass("error");
                add_trainee_modal.modal('hide');

                $("#saved_toast").toast('show');
            }
            else{
                
                if(trainee_name == ""){
                    $("#trainee_fullname").addClass("error");
                }
                if(trainee_specialization == ""){
                    $(".modal_specialization").addClass("error");
                }
                if(trainee_date_started == ""){
                    $("#trainee_date_started").addClass("error");
                }
                if(trainee_recruiter == ""){
                    $(".modal_recruiter").addClass("error");
                }
                if(trainee_note == ""){
                    $("#trainee_note").addClass("error");
                }
                $(".alert").show();
            }
        }
    );

    $("body")
        .on("click", "#add_cancel_btn", function(){
            let add_trainee_modal = $("#add_trainee_modal");
            add_trainee_modal.find("#trainee_fullname, .modal_specialization, #trainee_date_started, .modal_recruiter, #trainee_note").removeClass("error");
            add_trainee_modal.modal('hide');
            $(".alert").hide();
        }
    );

    $("body")
        .on("click", ".edit", function(){
            let edit_trainee_modal = $("#edit_trainee_modal");
            let trainee_id = $(this).closest(".add_trainee_group").attr("id");
            let full_trainee_id = "#"+trainee_id;

            edit_trainee_modal.find("#trainee_id").text(trainee_id);
            
            let trainee_name = $(full_trainee_id).find("#name").text();
            let trainee_specialization = $(full_trainee_id).find("#specialization").text();
            let trainee_date = $(full_trainee_id).find("#date").text();
            let trainee_status = $(full_trainee_id).find("#status .edit_delete_container span").text();
            let trainee_note = $(full_trainee_id).attr("data-tooltip");

            edit_trainee_modal.find("#trainee_name").val(trainee_name);
            edit_trainee_modal.find("#trainee_specialization").val(trainee_specialization);
            edit_trainee_modal.find(".modal_specialization button").attr("title", trainee_specialization);
            edit_trainee_modal.find(".modal_specialization .filter-option-inner-inner").text(trainee_specialization);
            edit_trainee_modal.find("#trainee_date").val(trainee_date);
            edit_trainee_modal.find("#trainee_status").val(trainee_status);
            edit_trainee_modal.find(".modal_status .filter-option-inner-inner").text(trainee_status);
            edit_trainee_modal.find("#trainee_note").val(trainee_note);
        }
    );

    $("body")
        .on("click", "#edit_save_btn", function(){
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

                edit_modal.find("#trainee_name, #trainee_date, #trainee_note").removeClass("error");
                edit_modal.modal('hide');
                $("#saved_toast").toast('show');

                if(trainee_id_selector.find("#status .edit_delete_container span").text() == "Employed"){
                    trainee_id_selector.find("#status").addClass("employed");
                }

                if(trainee_id_selector.find("#status .edit_delete_container span").text() == "Unemployed"){
                    trainee_id_selector.find("#status").addClass("unemployed");
                }
            }
            else{

                if(trainee_name == ""){
                    edit_modal.find("#trainee_name").addClass("error");
                }

                if(trainee_specialization == ""){
                    edit_modal.find("#trainee_specialization").addClass("error");
                }

                if(trainee_date == ""){
                    edit_modal.find("#trainee_date").addClass("error");
                }

                if(trainee_recruiter == ""){    
                    edit_modal.find("#trainee_status").addClass("error");
                }

                if(trainee_note == ""){
                    edit_modal.find("#trainee_note").addClass("error");
                }

                $(".alert").show();
            }
        }
    );

    $("body")
        .on("click", "#edit_cancel_btn", function(){
            $("#edit_trainee_modal").find("#trainee_name, #trainee_date, #trainee_note").removeClass("error");
            $("#edit_trainee_modal").modal('hide');
            $(".alert").hide();
        }
    );

    $("body")
        .on("click", ".delete", function(){
            let trainee_id = $(this).closest(".add_trainee_group").attr("id");
            $("#trainee_id").text(trainee_id);
        }
    );

    $("body")
        .on("click", ".dm_confirm_btn", function(){
            let trainee_list = $("#add_trainee_list");
            let trainee_id = $("#trainee_id").text();
            trainee_list.find("#"+trainee_id).remove();
            $("#deleted_toast").toast('show');
        }
    );
});