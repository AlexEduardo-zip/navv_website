$(document).ready(function () {
    // Código de navegação e animação
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Controle do slider
    let slideIndex = 0;
    const slides = $('.slide');
    const dots = $('#slider-controls .dot');

    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        $(slides[index]).addClass('active');
        $(dots[index]).addClass('active');
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    function currentSlide(index) {
        slideIndex = index;
        showSlide(slideIndex);
    }

    // Muda o slide automaticamente a cada 8 segundos
    setInterval(nextSlide, 8000);

    // Inicializa o primeiro slide
    showSlide(slideIndex);

    // Evento de clique para os pontos de navegação
    dots.each(function (index) {
        $(this).on('click', function () {
            currentSlide(index);
        });
    });

    // Alternância automática de depoimentos
    let feedbackIndex = 0;
    const feedbacks = $('#feedbacks .feedback');
    const feedbacksToShow = 3;

    function showFeedbacks() {
        feedbacks.hide(); // Oculta todos os depoimentos

        // Exibe o conjunto atual de três feedbacks
        for (let i = feedbackIndex; i < feedbackIndex + feedbacksToShow; i++) {
            $(feedbacks[i % feedbacks.length]).fadeIn(500);
        }
    }

    function nextFeedbackSet() {
        feedbackIndex = (feedbackIndex + feedbacksToShow) % feedbacks.length;
        showFeedbacks();
    }

    // Alterna os depoimentos a cada 5 segundos
    setInterval(nextFeedbackSet, 10000);

    // Exibe os primeiros três depoimentos
    showFeedbacks();

    // Atualiza a seleção da seção ativa no menu
    $(window).on('scroll', function () {
        // Define uma margem para ativar a seção antes de cobrir totalmente a tela
        const offsetMargin = 100;

        // Itera sobre cada seção e ajusta a navegação ativa
        $('section').each(function () {
            let sectionId = $(this).attr('id');
            let sectionTop = $(this).offset().top - offsetMargin;
            let sectionBottom = sectionTop + $(this).outerHeight();

            // Verifica se a seção está na visualização
            if ($(window).scrollTop() >= sectionTop && $(window).scrollTop() < sectionBottom) {
                // Remove a classe 'active' de todos os itens
                $('#nav_list .nav-item').removeClass('active');
                $('#mobile_nav_list .nav-item').removeClass('active');

                // Adiciona a classe 'active' ao item correspondente da seção atual
                $('#nav_list .nav-item a[href="#' + sectionId + '"]').parent().addClass('active');
                $('#mobile_nav_list .nav-item a[href="#' + sectionId + '"]').parent().addClass('active');
            }
        });
    });

    // Marca como ativa a seção ao clicar no item de navegação
    $('#nav_list .nav-item a, #mobile_nav_list .nav-item a').on('click', function () {
        $('#nav_list .nav-item').removeClass('active');
        $('#mobile_nav_list .nav-item').removeClass('active');
        $(this).parent().addClass('active');
    });
});
