$(document).ready(function () {

    
    var clickEvent = document.ontouchstart !== null ? 'click' : 'touchstart';
    
    // преобразование select в ul/li
    var  selects = [];
    $('body').find('.custom-list').each(function() {
        selects.push($(this));
    });
    
    selects.forEach(function(item, i, selects) {
        // Элемент select, который будет замещаться:
        var select = item;
        var selectBoxContainer = $('<div>',{
            class: 'custom-select',
            html: '<div class="selectBox"></div>'
        });
        var dropDown = $('<ul>',{class:'dropDown'});
        var selectBox = selectBoxContainer.find('.selectBox');

        // Цикл по оригинальному элементу select
        select.find('option').each(function(i){
            var option = $(this);
            if(i==0){
                selectBox.html(option.text());
                //return true;
            }   

            // Создаем выпадающий пункт в соответствии с данными select:
            var li = $('<li>',{
                html: option.text()
            });
            li.on('click touchstart', function(){
                selectBox.html(option.text());
                dropDown.trigger('hide');

                // Когда происходит событие click, мы также отражаем изменения в оригинальном элементе select:
                select.val(option.val());
                return false;
            });

            dropDown.append(li);
        });

        selectBoxContainer.append(dropDown.hide());
        select.hide().after(selectBoxContainer);    
    
        // Привязываем пользовательские события show и hide к элементу dropDown:
        dropDown.bind('show',function(){
            if(dropDown.is(':animated')){
                return false;
            }
            selectBox.addClass('expanded');
            dropDown.slideDown();

        }).bind('hide',function(){
            if(dropDown.is(':animated')){
                return false;
            }
            selectBox.removeClass('expanded');
            dropDown.slideUp();

        }).bind('toggle',function(){
            if(selectBox.hasClass('expanded')){
                dropDown.trigger('hide');
            }
            else dropDown.trigger('show');
        });

        selectBox.on('click touchstart', function(){
            dropDown.trigger('toggle');
            return false;
        });

        // Если нажать кнопку мыши где-нибудь на странице при открытом элементе dropDown, он будет спрятан:
        $(document).on('click touchstart', function(){
            dropDown.trigger('hide');
        });
        
    });    
    
    // всплывающее окно
    $(".fancybox").fancybox();

    // галерея
    $(".fancybox-gallery").fancybox({
        loop: true,
        animationEffect: 'zoom',
        transitionEffect: 'slide',
        transitionDuration: 500
    });

    // наведение на миниатюры галереи
    var a=jQuery;
    a(".gallery a").mouseenter(function() {
        var b=a("div.item_zoom",this);
        if(!b.length){
            b=a('<div class="item_zoom" style="position:absolute">').hide().appendTo(this);a("img:first",b).detach();
        }
        b.fadeIn("fast")
    })
    .mouseleave(function(){a("div",this).fadeOut("fast")}); 
    
    // FAQ
    $('#faq li').on(clickEvent, function () {
        $(this).toggleClass('opened');
        if ($(this).hasClass('opened')) {
            $(this).find('.answer').slideDown(300);
        } else {
            $(this).find('.answer').slideUp(300);
        }
    });
    $('#faq li .answer').on(clickEvent, function (e) {
        e.stopPropagation();
    });
    
    // меню на мобильных
    $('#top .menu-container span').on(clickEvent, function() {
        $('#top .menu').toggleClass('visible');
    });    
    
    // плавная прокрутка
    $('.button-scroll').on(clickEvent, function() {
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        $('#top .menu').toggleClass('visible');
        return false;
    });  
    
    // подгрузка видео с YouTube при скроллинге
    function loadVideo(videoUrl, videoBlock) {
        var videoTag = '<iframe src="' + videoUrl + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        $(videoBlock).html(videoTag);
    }

    function loadShowVideo (videoUrl, videoBlock) {
        if ($('*').is(videoBlock)) {
            var vFlag = true;
            $(window).on('scroll',function(){
                if ($(window).scrollTop() > ($(videoBlock).offset().top - 2000) && vFlag) {
                vFlag = false;
                    if ($(videoBlock).find('iframe').length == 0) {
                        loadVideo(videoUrl, videoBlock);
                    }
                }
            });
        }
    }

    loadShowVideo('https://www.youtube.com/embed/Eb4Y1Tglc4c', '#vintagist'); 
    loadShowVideo('https://www.youtube.com/embed/1GjlSN_ewLw', '#prokat_60x40');
    loadShowVideo('https://www.youtube.com/embed/He2wWzLpiHQ', '#kak_sobrat_1');
    loadShowVideo('https://www.youtube.com/embed/GeaXsJ2Ygrs', '#prokat_20x20_2');

    // слайдеры на мобильных
    if (document.documentElement.clientWidth < 768) {
        init_slider();
    }

    $(window).resize(function () {
        if (document.documentElement.clientWidth < 768) {
            if (!($('.mobile-slider').hasClass('slick-slider'))) {
                init_slider();
            }
        } else {
            if ($('.mobile-slider').hasClass('slick-slider')) {
                $('.mobile-slider').slick('unslick');
            }
        }
    });
    
    $.goods = {
        gibbon: {
            id: 'ZiV77glpjsW2adnnWCWzZ3',
            name: 'Гиббон',
            old_price: 13990,
            new_price: 6990,
            discount: 50,
            image: 'images/gibbon.png',
        },
        gibbon_pro: {
            id: 'tdehLskNh4KXn1Fj0iJcu0',
            name: 'Гиббон Про',
            old_price: 16690,
            new_price: 7490,
            discount: 55,
            image: 'images/gibbon-pro.png',
        },
        centroboy: {
            id: 'fdjdJc493dsk',
            name: 'Центробой',
            old_price: 1290,
            new_price: 790,
            discount: 40,
            image: 'images/advantages/advantage5.jpg',
        },
        adapter: {
            id: 'x5viCz3EglvghjoaYqg6f0',
            name: 'Адаптер для дрели',
            old_price: 890,
            new_price: 590,
            discount: 35,
            image: 'images/adapter.png',
        },
        ugol: {
            id: 'sTTn-S-uhLKfOaUhN6QyJ2',
            name: 'Магнитный угол',
            old_price: 990,
            new_price: 790,
            discount: 20,
            image: 'images/ugol.png',
        }
    }
    
    // заказ конкретной модели
    $('#models .button').on(clickEvent, function () {
        var model;
        
        model = $(this).data('model');
        
        // сброс чекбоксов
        $('#order-model').find('.custom-checkbox_input').each(function() {
            if ($(this).is(':checked')) {
                $(this).prop('checked', false);
                $(this).removeClass('checked');
            }
        }); 
        
        $('#order-model .model').val(model);
        $('#order-model .model').attr('data-id', $.goods[model].id);
        $('#order-model .form-title .model-name').text($.goods[model].name);
        $('#order-model .form-title .discount').text($.goods[model].discount);
        $('#order-model .form-title .new-price span').text(($.goods[model].new_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        $('#order-model .img-container img').attr('src', $.goods[model].image);
    });
    
    // заказ основного товара с дополнительным
    $('#dops .button').on(clickEvent, function () {
        var dop, dop_popup, form;
        
        dop = $(this).data('dop');
        
        // сброс чекбоксов
        $('#order-modal').find('.custom-checkbox_input').each(function() {
            if ($(this).is(':checked')) {
                $(this).prop('checked', false);
                $(this).removeClass('checked');
            }
        });        
        
        $('#order-modal .custom-checkbox_input').each(function() {
            item = $(this).data('dop');
            if (dop == item){
                $(this).prop('checked', true);
                $(this).addClass('checked');
            }
        });
        
        form = $('#order-modal .form-container');
        
        calc_sum(form);
    });

    // обновление информации на форме с выбором модели
    $('.custom-select li').on('click touchstart', function() {
        var model, form;

        model = $(this).closest('form').find('.custom-list').val();
        form = $(this).closest('.form-container');
        
        $(this).closest('.form-container').find('.model').attr('data-id', $.goods[model].id);
        $(this).closest('.form-container').find('.model').val(model);
        $(this).closest('.form-container').find('.form-title .model-name').text($.goods[model].name);
        $(this).closest('.form-container').find('.form-title .discount').text($.goods[model].discount);
        $(this).closest('.form-container').find('.img-container img').attr('src', $.goods[model].image);
        
        calc_sum(form);
    }); 
    

    // обработка чекбоксов
    $('.custom-checkbox_input').on('click touchstart', function() {
        var form, model;
        
        form = $(this).closest('.form-container');
        
        if ($(this).is(':checked')) {
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
        }        
        
        calc_sum(form);
    });    
    
    // выбор комплектующих
    $('#select-kit .parameter .available').on('click', function() {
        var item, parent;
        item = '#item-' + $(this).parent().attr('id');
        
        $(this).toggleClass('selected');
        
        if ($(item).hasClass('parent')){
            parent = '.' + $(item).data('item');
        }        

        if ($(this).hasClass('selected')){            
            $('#order-kit').find(item).addClass('active');
            $('#order-kit').find(parent).addClass('active');
        } else {
            $('#order-kit').find(item).removeClass('active');
            $('#order-kit').find(parent).removeClass('active');
        }

        update_total();
    });    
    
    // выбор комплектующего с вариантами
    $('#select-kit .parameter .gibbon-models span').on('click touchstart', function() {
        var item, model, selected_model;
        item = $(this).closest('.parameter').attr('id');
        selected_model = '#item-' + $(this).data('item');
        
        $(this).parent().find('span').removeClass('selected');
        $(this).addClass('selected');
        
        $('#order-kit .img-container').find('.' + item).removeClass('active');
        $('#order-kit .img-container').find(selected_model).addClass('active');
        $(this).closest('.parameter').find('.price span').text($.goods[$(this).data('item')].new_price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "));
        $(this).closest('.parameter').find('.price-old span').text($.goods[$(this).data('item')].old_price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "));
        
        update_total();
  
    });    
    
    // формируем заказ из выбранных товаров
    $('#select-kit .button').on('click touchstart', function() {        
        var item;
        
        if ($('#order-kit .img-container').find('.active').length > 0){
        
            // сбрасываем чекбоксы
            $('#quick-order form .custom-checkbox_input').prop('checked', false);
        
            $('#order-kit .img-container .active').each(function(){
                item = $(this).attr('id').split('-')[1];
                if ($(this).hasClass('gibbon')){
                    $('#quick-order form .model').val(item);
                    $('#quick-order form .model').attr('data-id', $.goods[item].id);                    
                } else {
                    $('#quick-order form .custom-checkbox_input').each(function(){
                        if ($(this).data('dop') == item){
                            $(this).prop('checked', true);
                        }
                    });
                }
            });                    

            $.fancybox.open({src  : '#quick-order',	type : 'inline'});
        }       
        
    });    
    


function init_slider() {
    $('.mobile-slider').slick({
        infinite: true,
        arrows: true,
        dots: false,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
}

function calc_sum(form) {
    var price = 0,
        old_price = 0,
        model = '',
        dop = '',
        comment = '';
    
    model = form.find('.model').val();
    price = $.goods[model].new_price;
    old_price = $.goods[model].old_price;
    
    form.find('.custom-checkbox_input').each(function() {
        if (($(this).prop("checked"))) {
            dop = $(this).data('dop');
            price += $.goods[dop].new_price;
            old_price += $.goods[dop].old_price;
            comment += $.goods[dop].name + '; '
        }
    });        

    if (form.find('.new-price').length > 0){
        form.find('.new-price span').text(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));        
    }
    if (form.find('.old-price').length > 0){
        form.find('.old-price span').text(old_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    }
    if (form.find('.comment').length > 0){
        form.find('.comment').val(comment);        
    }    
}

function update_total(){
    var sum = 0;
    $('#select-kit .parameter').each(function(){
        if ($(this).find('.selected').length > 0){
            sum += parseInt($(this).find('.price span').text().replace(' ', ''));
        }
    });
    $('#total-price .price').text(sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "));
}

// slider доп товаров на странице допов

$('.slider-for').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   fade: true,
   asNavFor: '.slider-nav',
   adaptiveHeight: true
 });
 $('.slider-nav').slick({
   slidesToShow: 3,
   slidesToScroll: 1,
   asNavFor: '.slider-for',
   dots: false,
   focusOnSelect: true,
   centerMode: true
 });
 
/* $('a[data-slide]').click(function(e) {
   e.preventDefault();
   var slideno = $(this).data('slide');
   $('.slider-nav').slick('slickGoTo', slideno - 1);
 });*/

// на странице sale вставляем в попап имя допа 

var dopName = $('#just-added .dop-name'),
    dopButton = $('[href*="#just-added"]');

   dopButton.on('click', function () {

    dopName.text($(this).attr('data-dopName'));
    $(this).css({'font-size': '18px',
                  'background-color': '#194d38'});
    this.innerHTML = "Товар добавлен в заказ";

   });

// на странице sale меняем кнопку "добавить в заказ" на товар добавлен + добавить еще один   

/*var plus = $('.adds-card .plus'),
    // count = $('.adds-card .count'),
    minus = $('.adds-card .minus');*/


/*plus.on('click', function () {
    count = +$('.adds-card .count').val();
    $('.adds-card .count').val(count + 1);
});

$('#minus').on('click', function () {
    let quant = +$('#count').val();
    if (quant > 1) {
        $('#count').val(quant - 1);
    }
});*/
var plus = $('.adds-card .plus'),
    minus = $('.adds-card .minus');

plus.on('click', function () {
    let quant = +$(this).siblings($('.count')).val();
    console.log(quant);
    $(this).siblings($('.count')).val(quant + 1);
});
minus.on('click', function () {
    let quant = +$(this).siblings($('.count')).val();
    console.log(quant);
    if (quant > 1) {
        $(this).siblings($('.count')).val(quant - 1);
    }
});

/*$('#plus').on('click', function () {
    let quant = +$(this).siblings($('.count')).val();
    console.log(quant);
    $(this).siblings($('.count')).val(quant + 1);
});
$('#minus').on('click', function () {
    let quant = +$(this).siblings($('.count')).val();
    if (quant > 1) {
        $(this).siblings($('.count')).val(quant - 1);
    }
});*/

/*$('#plus').on('click', function () {
    let quant = +$(this).siblings('.count').val();
    console.log(quant);
    $(this).siblings('.count').val(quant + 1);
});
$('#minus').on('click', function () {
    let quant = +$(this).siblings('.count').val();
    if (quant > 1) {
        $(this).siblings('.count').val(quant - 1);
    }
});*/

});