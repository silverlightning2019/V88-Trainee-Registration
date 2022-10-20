/** 
*   DOCU: Trainees Page Script
*   Last updated at: October 20, 2022
*   @author Silver
*/

$(document).ready(function(){
    $("body")
        .on("mouseenter", ".status", function(){
            $(this).html('<button class="edit" data-toggle="modal" data-target="#edit_trainee_modal">Edit</button> <button class="delete" data-toggle="modal" data-target="#delete_trainee_modal">Delete</button>');
        }
    );

    $("body")
        .on("mouseleave", ".status", function(){
            $(this).html("Employed");
        }
    );

    $("body")
        .on("click", ".save_btn", function(){
            let trainee_name = $("#trainee_fullname").val();
            let trainee_specialization = $("#trainee_specialization").val();
            let trainee_date_started = $("#trainee_date_started").val();
            let trainee_recruiter = $("#trainee_recruiter").val();
            let data_id = $("#add_trainee_list .add_trainee_group").length;
            let trainee_id = "trainee_" + data_id;
            let trainee_item_clone = $("#hidden_trainee_clone .add_trainee_group").clone();

            trainee_item_clone.find(".name").text(trainee_name);
            trainee_item_clone.find(".specialization").text(trainee_specialization);
            trainee_item_clone.find(".date_started").text(trainee_date_started);
            trainee_item_clone.find(".recruiter").text(trainee_recruiter);
            trainee_item_clone.find(".status").text("Training");
            $("#add_trainee_list").append(trainee_item_clone);

            $("#empty_list_text").hide();   

            // alert(data_id);
        }
    );

    // $("body")
    //     .on("click", ".edit", function(){
    //         alert("Edit!")
    //     }
    // );
});