let vntGcSlideIndex = 1;
        vntGcShowSlides(vntGcSlideIndex);

        function vntGcPlusSlides(n) {
            vntGcShowSlides(vntGcSlideIndex += n);
        }

        function vntGcCurrentSlide(n) {
            vntGcShowSlides(vntGcSlideIndex = n);
        }

        function vntGcShowSlides(n) {
            let i;
            let slides = document.getElementsByClassName("vnt-gc-slide");
            let dots = document.getElementsByClassName("vnt-gc-demo");
            let captionText = document.getElementById("vntGcCaption");
            if (n > slides.length) { vntGcSlideIndex = 1 }
            if (n < 1) { vntGcSlideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" vnt-gc-active", "");
            }
            slides[vntGcSlideIndex - 1].style.display = "block";
            dots[vntGcSlideIndex - 1].className += " vnt-gc-active";
            captionText.innerHTML = dots[vntGcSlideIndex - 1].alt;
        }