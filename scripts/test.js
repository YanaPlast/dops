$(document).ready(function(){

    // Форма отправки отзыва

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

    // отправить книгу 
    $('#book-modal #get-book').on('click', function(event) {
        event.preventDefault();
        var info = [];
        info.push($('#book-modal input[type="email"]').val());
        $.ajax({
            url: '/scripts/sendEmail.php',
            type: 'post',
            data: {info: info},
            success: function(reply){
                $('#book-modal input[type="email"]').val('');
                $('#message .message-text').text('Книга отправлена на указанный email!');
                $('#success').click();
            }
        });
    });


});
