document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector("header");
    var container = document.querySelector(".container");
    var headerHeight = header.offsetHeight;

    container.style.paddingTop = headerHeight + "px";

    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            var targetId = this.getAttribute("href").substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                var originalTop = targetElement.getBoundingClientRect().top;
                var adjustedTop = originalTop - headerHeight;
                window.scrollTo({
                    top: adjustedTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Slideshow
    const slideshows = document.querySelectorAll('.slideshow-container');
    let allKeyframes = '';

    slideshows.forEach((slideshowContainer, slideshowIndex) => {
        const slides = slideshowContainer.querySelectorAll(".slide");
        const slideCount = slides.length;
        const slideDuration = 5; // Duration each slide is fully visible (not including fade)
        const fadeDuration = 1; // Duration for the fade-in and fade-out
        const totalDuration = (slideDuration + fadeDuration) * slideCount; // Total duration for the slideshow cycle in seconds

        slides.forEach((slide, index) => {
            let lastOption = '';

            if (index == slideCount - 1) {
                lastOption = `
                0% { opacity: 1; }
                ${(fadeDuration / totalDuration) * 100}% { opacity: 0; }
            `;
            }

            const animationName = `fade${slideshowIndex}-${index}`;
            const delay = index * (slideDuration + fadeDuration);

            // Generate keyframes for each slide
            allKeyframes += `
            @keyframes ${animationName} {
                ${lastOption}
                ${(delay / totalDuration) * 100}% { opacity: 0; }
                ${((delay + fadeDuration) / totalDuration) * 100}% { opacity: 1; }
                ${((delay + fadeDuration + slideDuration) / totalDuration) * 100}% { opacity: 1; }
                ${((delay + fadeDuration + slideDuration + fadeDuration) / totalDuration) * 100}% { opacity: 0; }
            }
        `;

            // Apply the animation to each slide
            slide.style.animation = `${animationName} ${totalDuration}s infinite`;
        });
    });

    // Create a style element and append it to the head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = allKeyframes;
    document.head.appendChild(styleSheet);

    const slideshowContainer = document.querySelector('.slideshow-container');
    const aspectRatio = 9 / 16;
    const updatePaddingBottom = () =>
        slideshowContainer.style.paddingBottom = `${aspectRatio * slideshowContainer.clientWidth}px`;

    window.addEventListener('resize', updatePaddingBottom);
    updatePaddingBottom();
    
});


// slider
$('.slider').slick({
    fade:true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed:1000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
});

$('.slider').on('touchmove', function(event, slick, currentSlide, nextSlide){
    $('.slider').slick('slickPlay');
});
