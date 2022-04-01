$(document).ready(function () { 

  $('textarea').on("input", function () {
    // every user input on text area will set counter value to 140 minus text length
    const tweetLength = $(this).val().length;
    const charLimit = 140 - tweetLength;
    $('#counter').text(charLimit);

    // set colour to red if character limit exceeds 140
    if (charLimit < 0) {
      $('#counter').css('color', '#FF0000');
    } else {
      $('#counter').css('color', '#000000');
    }
  })
});