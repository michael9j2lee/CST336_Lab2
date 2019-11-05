/*global $*/
        /*global _*/
        /*global localStorage*/
        $(document).ready(function(){
            //*****************************************************
            //Global Variables
            //*****************************************************
            var score = 0;
            var attempts = localStorage.getItem("total_attempts");
            
            //*****************************************************
            //event listeners
            //*****************************************************
            $("button").on("click",gradeQuiz);
        
            //Question 5 Images
            $(".q5Choice").on("click", function() {
                $(".q5Choice").css("background","");
                $(this).css("background","rgb(255, 255, 0)");
            });
            
            //Display all the choices in different order for Question 4 and 8
            displayQ48Choices();
            //*****************************************************
            //functions
            //*****************************************************
            function displayQ48Choices(){
                let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
                let q8ChoicesArray = ["James Garfield","Abraham Lincoln","John F Kennedy","George Bush"];
                q4ChoicesArray = _.shuffle(q4ChoicesArray);
                q8ChoicesArray = _.shuffle(q8ChoicesArray);
                
                for( let i = 0; i < q4ChoicesArray.length; i++){
                    $("#q4Choices").append(` <input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for ="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`);
                    $("#q8Choices").append(` <input type="radio" name="q8" id="${q8ChoicesArray[i]}" value="${q8ChoicesArray[i]}"> <label for ="${q8ChoicesArray[i]}"> ${q8ChoicesArray[i]}</label>`);
                    
                }
            }
            
            function isFormValid(){
                let isValid = true;
                if ($("#q1").val() == ""){
                    isValid = false;
                    console.log($("#q1").val());
                    $("#validationFdbk").html("Question 1 was no answered");
                }
                return isValid;
            }
            
            function gradeQuiz(){
                $("#validationFdbk").html(""); //resets validation feedback
                //Check if form is valid
                if(!isFormValid()){
                    return;
                }
                //variables
                score = 0;
                let q1Response = $("#q1").val().toLowerCase();
                let q2Response = $("#q2").val();
                let q4Response = $("input[name=q4]:checked").val();
                let q6Response = $("#q6").val();
                let q7Response = $("#q7").val();
                let q8Response = $("input[name=q8]:checked").val();
                
                
                //Question 1
                if(q1Response == "sacremento"){
                    rightAnswer(1);
                } else {
                    wrongAnswer(1);
                }
                
                //Question 2
                if (q2Response =="mo"){
                    rightAnswer(2);
                } else {
                    wrongAnswer(2);
                }
                
                //Question 3
                if ( 
                    $("#Jefferson").is(":checked") 
                &&  $("#Roosevelt").is(":checked") 
                && !$("#Jackson").is(":checked") 
                && !$("#Franklin").is(":checked") 
                ){
                    rightAnswer(3);
                } else{
                    wrongAnswer(3);
                }
                
                //Question 4
                if(q4Response == "Rhode Island"){
                    rightAnswer(4);
                } else {
                    wrongAnswer(4);
                }
                
                //Question 5
                if($("#seal2").css("background-color") == "rgb(255, 255, 0)") {
                    rightAnswer(5);
                } else {
                    wrongAnswer(5);
                }
                
                //Question 6
                if(q6Response == 50){
                    rightAnswer(6);
                } else {
                    wrongAnswer(6)
                }
                
                //Question 7
                if(q7Response == "ca"){
                    rightAnswer(7);
                } else {
                    wrongAnswer(7);
                }
                
                //Question 8
                if(q8Response == "Abraham Lincoln"){
                    rightAnswer(8);
                } else {
                    wrongAnswer(8);
                }
                
                if (score >= 80){
                    $("#totalScore").css("backgroundColor", 'green');
                    alert("Congrats!  You passed!")
                    
                } else {
                    $("#totalScore").css("backgroundColor", 'red');
                }
                
                
                $("#totalScore").html(`Total Score: ${score}`);
                
                
                $("#totalAttempts").html(`Total Attempts: ${++attempts}`);
                localStorage.setItem("total_attempts",attempts);
            }
            
            function rightAnswer(index){
                $(`#q${index}Feedback`).html("Correct!");
                $(`#q${index}Feedback`).attr("class", "bg-success text-white");
                $(`#markImg${index}`).html("<img src = 'img/checkmark.png' alt = 'checkmark'>");
                score+=12.5;
            }
            
            function wrongAnswer(index){
                $(`#q${index}Feedback`).html("Incorrect!");
                $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
                $(`#markImg${index}`).html("<img src = 'img/xmark.png' alt = 'xmark'>");
            }
            
            
        })//ready