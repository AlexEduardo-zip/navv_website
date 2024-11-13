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
    let isManualSlideChange = false; // Flag para verificar se o slide foi alterado manualmente

    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        $(slides[index]).addClass('active');
        $(dots[index]).addClass('active');
    }

    function nextSlide() {
        if (!isManualSlideChange) {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        }
        isManualSlideChange = false; // Reseta a flag após cada mudança automática
    }

    function currentSlide(index) {
        slideIndex = index;
        isManualSlideChange = true; // Define que o slide foi alterado manualmente
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

    // Implementa a transição por arraste
    let startX = 0;
    let isDragging = false;

    slides.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
        isDragging = true;
    });

    slides.on('touchmove', function (e) {
        if (!isDragging) return;
        const touchX = e.originalEvent.touches[0].clientX;
        const diff = startX - touchX;

        if (diff > 50) {
            nextSlide();
            isDragging = false;
        } else if (diff < -50) {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlide(slideIndex);
            isDragging = false;
        }
    });

    slides.on('touchend', function () {
        isDragging = false;
    });

    // Alternância automática de depoimentos
    let feedbackIndex = 0;
    const feedbacks = $('#feedbacks .feedback');
    const feedbacksToShow = 3;

    function showFeedbacks() {
        feedbacks.hide(); // Oculta todos os depoimentos
        for (let i = feedbackIndex; i < feedbackIndex + feedbacksToShow; i++) {
            $(feedbacks[i % feedbacks.length]).fadeIn(500);
        }
    }

    function nextFeedbackSet() {
        feedbackIndex = (feedbackIndex + feedbacksToShow) % feedbacks.length;
        showFeedbacks();
    }

    setInterval(nextFeedbackSet, 10000);
    showFeedbacks();

    // Atualiza a seleção da seção ativa no menu
    $(window).on('scroll', function () {
        const offsetMargin = 100;
        $('section').each(function () {
            let sectionId = $(this).attr('id');
            let sectionTop = $(this).offset().top - offsetMargin;
            let sectionBottom = sectionTop + $(this).outerHeight();

            if ($(window).scrollTop() >= sectionTop && $(window).scrollTop() < sectionBottom) {
                $('#nav_list .nav-item').removeClass('active');
                $('#mobile_nav_list .nav-item').removeClass('active');
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
