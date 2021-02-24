$(document).ready(function(){

    $('#feedback-form #send-form').on('click', function(event) {
        event.preventDefault();
        var request_info = [];
        request_info.push($('#feedback-form #feedback_message').val());
        request_info.push($('#feedback-form input[type="text"]').val());
  
        $.ajax({
            url: '/scripts/sendRequest.php',
            type: 'post',
            data: {request_info: request_info},
            success: function(rep){
                $('#feedback-form #feedback_message, #feedback-form input[type="text"]').val('');
                $('#message .offer').text('Спасибо!');
                $('#message .message-text').text('Ваш отзыв отправлен.');
                $('#success').click();
            }
        });
    });  

});