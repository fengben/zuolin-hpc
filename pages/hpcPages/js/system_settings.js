$(document).ready(function() {
  $('.changeTable').find('td').bind('dblclick', function() {
    var input = '<input type=\'text\' id=\'temp\' value=' + $(this).text() + ' >';
    $(this).text('');
    $(this).append(input);
    $('input#temp').focus();
    $('input').blur(function() {
      if ($(this).val() == '') {
        $(this).remove();
      } else {
        $(this).closest('td').text($(this).val());
      }
    });

  });

});