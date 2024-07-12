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
});
