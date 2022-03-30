$(document).ready(function () { 
  $('textarea').on("input", function () {
    const tweetLength = $(this).val().length;
    const charLimit = 140 - tweetLength;
    $('#counter').text(charLimit);


    if (charLimit < 0) {
      $('#counter').css('color', '#FF0000');
    } else {
      $('#counter').css('color', '#000000');
    }
  })
});