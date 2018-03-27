$(document).ready(function(){
    $('.new-tweet textarea').on('keyup', function(){

      $(this).parent().find('span').text(140 - $(this).val().length);
  });
});