function validate(form) {
    var name, phone, pattern_name;

    name = $.trim(form.find('input[name="name"]').val());
    phone = form.find('input[name="phone"]').val().replace(/\D+/g, "");

    pattern_name = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;

    $.errors = false;

    if ((name.length < 2) || (pattern_name.test(name) == false)) {
        alert('Введите корректное имя!');
        $.errors = true;
        form.find('input[name="name"]').focus();
        return false;
    }

    if (phone.length < 11) {
        alert('Введите корректный номер телефона!');
        $.errors = true;
        form.find('input[name="phone"]').focus();
        return false;
    }
}

function send_order(form) {
    var order_array = {},
        dop = '';

    order_array['name'] = form.find('input[name="name"]').val();
    order_array['phone'] = form.find('input[name="phone"]').val();
    order_array['url'] = form.find('input[name="url"]').val();

    order_array['items'] = [];

    if (form.find('.model').length > 0) {
        order_array['items'].push(form.find('.model').data('id'));
    }

    if (form.find('.custom-checkbox_input').length > 0) {
        form.find('.custom-checkbox_input').each(function () {
            if (($(this).prop("checked"))) {
                dop = $(this).data('dop');
                order_array['items'].push($.goods[dop].id);
            }
        });
    }

    if (form.hasClass('consultation-form')) {
        window.dataLayer.push({'event': 'callback_submit'});
    } else {
        window.dataLayer.push({'event': 'zakaz_submit'})
    }

    $.fancybox.close();
    form.find('input[type=text]').val('');

    $.ajax({
        url: '/plugins/order/create.php',
        type: 'post',
        data: order_array,
        success: (data) => {
            if (data.success) {
                $('#message .offer').text('Спасибо, ваша заявка принята!');
                $('#message .message-text').html($.message);
                $.fancybox.open($('#message'));
                order_array = [];
            } else {
                $('#message .offer').text('Ошибка!');
                $('#message .message-text').html('К сожалению, не удалось отправить заявку.');
                $.fancybox.open($('#message'));
                order_array = [];
            }

        }
    });
}