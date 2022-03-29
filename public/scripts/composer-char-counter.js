$(document).ready(function () { 
  $('textarea').on("input", function () {
    const counter = document.getElementById('counter');
    const tweetLength = $(this).val().length;
    const charLimit = 140 - tweetLength;
    $(counter)[0].value = charLimit;

    if (charLimit < 0) {
      $('#counter').css('color', 'red');
    } else {
      $('#counter').css('color', 'black');
    }
  })
});