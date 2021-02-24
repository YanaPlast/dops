$(document).ready(function(){

$('#send-request').on('click', function(event) {
    event.preventDefault();
    var request_info = [];
    request_info.push($('#feedback-form #feedback_message').val());
    request_info.push($('#feedback-form #feedback_phone').val());   
    $.ajax({
        url: '/trubogib-gibbon/scripts/sendRequest.php',
        type: 'post',
        data: {request_info: request_info},
        success: function(rep){
            $('#feedback-form #feedback_message, #feedback-form #feedback_phone').val('');
            $('#message .message-text').text('Ваша заявка отправлена!');
            $('#success').click();
        }
    });
}); 

});