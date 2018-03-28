$(document).ready(function(){
    $('.new-tweet textarea').on('keyup', function(){
      let tweetLength = 140 - $(this).val().length;
      let counter = $('span').last();
      counter.text(tweetLength);
      if (tweetLength < 0) {
        counter.addClass('red-text');
      } else {
        counter.removeClass('red-text');
      }
  });
});