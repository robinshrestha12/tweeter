$(document).ready(function(){ //ensures the DOM has loaded
$(".answer").on('input', function() { //this works from text area
  const remainingChar=140-$(this).val().length; //variable for character lengh setting
    $(this).parents().find('.counter').text(function(){ //getting value from parent this.
     $(this).text(remainingChar); //setting the value
    if(remainingChar>=0){
      $(this).css('color', 'black'); //color setting.
    }
    else {
      $(this).css('color', 'red');
    }
    });
 });
});


